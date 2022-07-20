import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from datetime import date
from django.db.models import Sum, Q, Count, F
from datetime import datetime
from http import HTTPStatus

from .serializers import *
from . import models



@api_view(('GET',))
def FeaturedRooms_component(request):
    room_types = models.RoomType.objects.filter(Q(room_name='Premium King') | Q(room_name='Premium Royal') | Q(room_name='Premium Sea View'))
    room_types_serialized = RoomTypeSerializer(room_types, many=True)

    return Response(room_types_serialized.data)
    # for item in room_types_serialized.data:
    #     item = dict(item)

    # json_response = [
    #     {"room_types" : room_types_serialized.data},
    # ]

    # return Response(json_response)



@api_view(('GET',))
def Testimonials_component(request):
    reviews = models.Review.objects.all().order_by('rate')[:9]
    reviews_serialized = ReviewSerializer(reviews, many=True)
    return Response(reviews_serialized.data)
    
    # for item in reviews_serialized.data:
    #     item = dict(item)

    # json_response = [
    #     {"reviews" : reviews_serialized.data},
    # ]
    # return Response(json_response)


@api_view(('GET',))
def Stats_component(request):

    guests_count = models.Booking.objects.filter(check_out__gte = date.today()).count()
    room_count = models.RoomType.objects.aggregate(Sum('room_count'))['room_count__sum']
    staff_count = 200
    positive_ratings_count = models.Review.objects.filter(rate__gte = 4).count()

    json_response = {
        "guests_count" : guests_count,
        "rooms_count" : room_count,
        "staff_count" : staff_count,
        "positive_ratings_count" : positive_ratings_count,
    }

    return Response(json_response)


@api_view(("GET","POST"))
def BookNow(request):
    if request.method == 'GET':
        rooms = models.RoomType.objects.annotate(
            vacant_count=Count('roomvacancy', filter=Q(roomvacancy__is_vacant=True))
            ).filter(vacant_count__gte=1)

        returned_serialized = BookRoomSerializer(rooms, many=True)

        return Response(returned_serialized.data)
    elif request.method == 'POST':
        serialized_data = HeaderFormSerializer(data=request.data)
        print(json.dumps(request.data))
        if serialized_data.is_valid():
            print("VALID")
            valid_data = serialized_data.validated_data

            total_guests = valid_data['adults'] + valid_data['children']

            rooms = models.RoomType.objects.annotate(
                    vacant_count=Count(
                        'roomvacancy', filter=Q(roomvacancy__is_vacant=True)
                        )
                    ).filter(
                        vacant_count__gte=1,
                        capacity__gte = int(total_guests)
                        )

            free_space = rooms.annotate(free_space= F('vacant_count') * F('capacity')).aggregate(total_free_space=Sum('free_space'))['total_free_space']
            vacant_count = rooms.aggregate(total_vacant_count=Sum('vacant_count'))['total_vacant_count']

            if rooms:
                if free_space >=  total_guests:
                    if vacant_count >= valid_data['rooms']:
                        returned_serialized = BookRoomSerializer(rooms, many=True)
                        response = {
                            "Error" : "No error",
                            "Data" : returned_serialized.data}

                    else:
                        returned_serialized = BookRoomSerializer(rooms, many=True)
                        response = {
                            "Error" : "Vacant rooms are lesser than the number of rooms requested",
                            "Data" : returned_serialized.data
                            }
                
                elif free_space == 0:
                    response = {
                        "Error": "All rooms are booked",
                        "Data": ""}
                
                elif free_space < total_guests:
                    response = {
                        "Error": "Vacant rooms are not enough for the number of guests",
                        "Data" : ""}
                
            else:
                response = {
                    "Error": "All rooms are booked",
                    "Data": ""}

        else:
            print("INVALID")

            response = {
                "Error" : serialized_data.errors,
                "Data" : ""
            }

        print(response)

        return Response(data = response)