import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from datetime import date, datetime, timedelta
from django.db.models import Sum, Q, Count, F
from datetime import datetime
from http import HTTPStatus

from .serializers import *
from . import models

from django.contrib.auth.models import User


@api_view(('GET',))
def FeaturedRooms_component(request):
    room_types = models.RoomType.objects.filter(Q(room_name='Premium King') | Q(room_name='Premium Royal') | Q(room_name='Premium Sea View'))
    room_types_serialized = RoomTypeSerializer(room_types, many=True, fields=('room_name', 'cost_per_day','description', 'room_pictures'))

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
    print(reviews_serialized.data)
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
        today = datetime.now().date()
        tomorrow = datetime.now().date() + timedelta(days=1)
        total_guests='1'

        booked_rooms = models.Booking.objects.exclude(
            check_out__lte=today
            ).exclude(
                Q(check_in__lt=today, check_out__lte=today) | Q(check_in__gte=tomorrow, check_out__gt=tomorrow)
                ).values_list('room_number', flat=True)

        rooms = models.RoomType.objects.annotate(
                vacant_count=Count(
                    'room', filter=~Q(room__room_number__in=list(booked_rooms)) if booked_rooms else None
                    )
                ).filter(
                    vacant_count__gte=1,
                    capacity__gte = int(total_guests)
                    )

        returned_serialized = BookRoomSerializer(rooms, many=True)
        return Response(returned_serialized.data)
    elif request.method == 'POST':
        serialized_data = HeaderFormSerializer(data=request.data)

        if serialized_data.is_valid():
            print("VALID")
            valid_data = serialized_data.validated_data

            total_guests = valid_data['adults'] + valid_data['children']
            check_in = valid_data['checkIn']
            check_out = valid_data['checkOut']
            yesterday = datetime.now().date() - timedelta(days = 1)

            booked_rooms = models.Booking.objects.exclude(
                check_out__lte=yesterday
                ).exclude(
                    Q(check_in__lt=check_in, check_out__lte=check_in) | Q(check_in__gte=check_out, check_out__gt=check_out)
                    ).values_list('room_number', flat=True)
            
            rooms = models.RoomType.objects.annotate(
                    vacant_count=Count(
                        'room', filter=~Q(room__room_number__in=list(booked_rooms))
                        )
                    ).filter(
                        vacant_count__gte=1,
                        capacity__gte = int(total_guests)
                        )

            free_space = rooms.annotate(free_space= F('vacant_count') * F('capacity')).aggregate(total_free_space=Sum('free_space'))['total_free_space']
            vacant_count = rooms.aggregate(total_vacant_count=Sum('vacant_count'))['total_vacant_count']

            if rooms:
                if free_space >=  total_guests:
                    returned_serialized = BookRoomSerializer(rooms, many=True)
                    if vacant_count >= valid_data['rooms']:
                        response = {
                            "Error" : "No error",
                            "Data" : returned_serialized.data}

                    else:
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


@api_view(("GET",))
def Rooms(request, room_name=None):
    if room_name:
        # Convert slug to string
        room_name = room_name.replace('-', ' ')

        room = models.RoomType.objects.get(room_name=room_name)
        serialized_rooms = RoomTypeSerializer(room, context={"minimised_services": True})

    else:
        rooms = models.RoomType.objects.all()
        serialized_rooms = RoomTypeSerializer(rooms, many=True, fields=("room_name", "room_pictures"))

    return Response(serialized_rooms.data)


@api_view(("POST",))
# @permission_classes([IsAuthenticated])
def BookingInfo(request):
    if request.method == 'POST':
        room_names = request.data["room"]

        rooms = models.RoomType.objects.filter(room_name__in=room_names)
        serialized = RoomTypeSerializer(
            rooms,
            fields=('room_name', 'cost_per_day', 'capacity', 'services'),
            context={"minimised_services" : True},
            many=True)
        return Response(serialized.data)

@api_view(('POST',))
def SignUp(request):
    if request.method == 'POST':
        serialized = UserRegisterSerializer(data=request.data)
        if serialized.is_valid():
            validated = serialized.validated_data
            if validated['check'] == "True" and validated['password'] == validated['confirm_password']:
                new_user = User.objects.create_user(username=validated['username'], password=validated['password'], first_name=validated['first_name'], last_name=validated['last_name'])
                new_user.save()
                response = {'message': 'success'}
            else:
                response = {'message': 'error'}
        else:
            response = {'message': 'error, data not valid'}

        return Response(response)