from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import date
from django.db.models import Sum, Q, Count
from datetime import datetime

from .serializers import *
from . import models



@api_view(('GET',))
def FeaturedRooms_component(request):
    room_types = models.RoomType.objects.filter(Q(room_name='Premium King') | Q(room_name='Premium Royal') | Q(room_name='Premium Sea View'))
    room_types_serialized = RoomTypeSerializer(room_types, many=True)

    for item in room_types_serialized.data:
        item = dict(item)

    json_response = [
        {"room_types" : room_types_serialized.data},
    ]

    return Response(json_response)



@api_view(('GET',))
def Testimonials_component(request):
    reviews = models.Review.objects.all().order_by('rate')[:9]
    reviews_serialized = ReviewSerializer(reviews, many=True)
    for item in reviews_serialized.data:
        item = dict(item)

    json_response = [
        {"reviews" : reviews_serialized.data},
    ]
    return Response(json_response)


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
        print(request.data)
        if serialized_data.is_valid():
            print("VALID")
            valid_data = serialized_data.validated_data

            # Returns the rooms that have space for equal
            # or more than the number of guests,
            # and that have number of vacant rooms
            # equal or more than then desire number of rooms


            # Solution 1:
            # rooms = models.RoomType.objects.filter(capacity__gte = int(valid_data['adults'] + valid_data['children']))
            # for room in rooms:
            #     if models.RoomVacancy.objects.filter(room_name=room.room_name, is_vacant=True).count() >= valid_data['rooms']:
            #         continue
            #     else:
            #         rooms = rooms.exclude(room_name=room.room_name) 
            
            # Solution explanation:
            # https://betterprogramming.pub/django-annotations-and-aggregations-48685994d149

            # Solution 2:

            rooms = models.RoomType.objects.annotate(
                    vacant_count=Count(
                        'roomvacancy', filter=Q(roomvacancy__is_vacant=True)
                        )
                    ).filter(vacant_count__gte=valid_data['rooms'], capacity__gte = int(valid_data['adults'] + valid_data['children']))

            returned_serialized = BookRoomSerializer(rooms, many=True)

            return Response(returned_serialized.data)

        else:
            print("INVALID INPUT")
            print(serialized_data.errors)
            return Response(serialized_data.errors)