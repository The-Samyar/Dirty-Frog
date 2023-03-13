import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from datetime import date, datetime, timedelta
from django.db.models import Sum, Q, Count, F
from django.contrib.auth.hashers import check_password, make_password
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

        booked_ids = models.Booking.objects.exclude(
            check_out__lte=today
            ).exclude(
                Q(check_in__lt=today, check_out__lte=today) | Q(check_in__gte=tomorrow, check_out__gt=tomorrow)
                )

        booked_rooms = models.BookedRoom.objects.filter(booking_id__in=booked_ids).values_list('room_number', flat=True)


        rooms = models.RoomType.objects.annotate(
                vacant_count=Count(
                    'room', filter=~Q(room__room_number__in=booked_rooms) if booked_rooms else None
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
            today = datetime.now().date()

            booked_ids = models.Booking.objects.exclude(
                check_out__lte=today
                ).exclude(
                    Q(check_in__lt=check_in, check_out__lte=check_in) | Q(check_in__gte=check_out, check_out__gt=check_out)
                    )

            booked_rooms = models.BookedRoom.objects.filter(booking_id__in=booked_ids).values_list('room_number', flat=True)

            
            rooms = models.RoomType.objects.annotate(
                    vacant_count=Count(
                        'room', filter=~Q(room__room_number__in=booked_rooms)
                        )
                    ).filter(
                        vacant_count__gte=1,
                        capacity__gte = int(total_guests)
                        )
            print(rooms)
            print("###############CHECK")

            free_space = rooms.annotate(free_space= F('vacant_count') * F('capacity')).aggregate(total_free_space=Sum('free_space'))['total_free_space']
            vacant_count = rooms.aggregate(total_vacant_count=Sum('vacant_count'))['total_vacant_count']

            if rooms:
                if free_space >=  total_guests:
                    returned_serialized = BookRoomSerializer(rooms, many=True)
                    if vacant_count >= valid_data['rooms']:
                        response = {
                            "Error" : "",
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

            print("###################")
            print(validated)
            if validated['check'] == True and validated['password'] == validated['confirm_password']:
                new_user = User.objects.create_user(username=validated['username'], password=validated['password'], first_name=validated['first_name'], last_name=validated['last_name'])
                new_user.save()
                response = {'message': 'success'}
            else:
                response = {'message': 'error'}
        else:
            response = {'message': f'{serialized.errors}'}
        print(response)
        return Response(response)

@api_view(("POST",))
# @permission_classes([IsAuthenticated])
def Booking(request):
    if request.method == 'POST':
        serialized = BookingModelSerializer(data=request.data)
        if serialized.is_valid():
            validated = serialized.validated_data
            user = User.objects.get(username="akbar")
            print("VALID")
            print(validated)

            rooms = validated["rooms"]

            today = datetime.now().date()
            booked_ids = models.Booking.objects.exclude(
                check_out__lte=today
                ).exclude(
                    Q(check_in__lt=validated["check_in"], check_out__lte=validated["check_in"]) | Q(check_in__gte=validated["check_out"], check_out__gt=validated["check_out"])
                    )

            booked_rooms = models.BookedRoom.objects.filter(booking_id__in=booked_ids)

            available_rooms = {}

            error = False

            for room in rooms:
                specific_booked_rooms = booked_rooms.filter(Q(room_number__room_name=room["room_name"])).values_list("room_number", flat=True)
                vacant_rooms = models.Room.objects.filter(room_name=room["room_name"]).filter(~Q(room_number__in=specific_booked_rooms))
                if len(vacant_rooms) >= int(room["count"]):
                    available_rooms[f"{room['room_name']}"] = vacant_rooms[:room["count"]]
                else:
                    error = True
                    break
            
            if not error:
                total_cost = 0
                booking_id = models.Booking(
                    user=user,
                    check_in=validated["check_in"],
                    check_out=validated["check_out"],
                    adults_count=validated["adults_count"],
                    children_count=validated["children_count"]
                    )
                booking_id.save()
                for room in available_rooms:
                    for room_number in available_rooms[room]:
                        booked = models.BookedRoom(
                            room_number=room_number,
                            booking_id=booking_id)
                        booked.save()
                        total_cost += float(room_number.room_name.cost_per_day) * ((validated["check_out"] - validated["check_in"]).days)
                
                total_cost = (total_cost * 1.09) + 10

                booking_id._total_cost = total_cost
                booking_id.save()
                message = {"message" : "successful"}

            else:
                message = {"message" : "unsuccessful"}
        else:
            message = {"message": f"{serialized.errors}"}

        return Response(message)

@api_view(('GET', 'POST'))
def ProfileData(request):

    user = User.objects.get(username='akbar')

    today = datetime.now().date()
    is_checked = models.Booking.objects.filter(user = user, check_in__lte = today, check_out__gte = today)

    user_info = {
        'first_name' : user.first_name,
        'last_name' : user.last_name,
        'username' : user.username,
        'email' : user.email,
        'dob' : f"{user.userinfo.dob}",
        'gender' : user.userinfo.gender,
        'phone_number' : user.userinfo.phone_number,
        'is_checked' : True if is_checked else False,
        'profile_picture' : user.userinfo.profile_picture,
    }

    if request.method == 'GET':
        return Response(user_info)
    
    elif request.method == 'POST':
        print("Changed fields:")
        for row in request.data:
            if user_info[row] != request.data[row]:
                print(f"{row} : {user_info[row]} --> {row} : {request.data[row]}")

                # Method 1
                if hasattr(user, row):
                    setattr(user, row, request.data[row])
                    user.save()
                else:
                    setattr(user.userinfo, row, request.data[row])
                    user.userinfo.save()

                # Method 2
                # setattr(user, row, request.data[row])
                # user.save()
                # setattr(user.userinfo, row, request.data[row])
                # user.userinfo.save()

        return Response("Information was successfully edited")

@api_view(('POST',))
def ProfileImage(request):

    #   Preferred way of uploading image:
    #   <form method="POST" action="" enctype='multipart/form-data'>
    #     {% csrf_token %}
    #     <input type="submit"></input>
    #     {{ form }}
    #   </form>

    # from django.core.files.images import ImageFile

    from PIL import Image
    from pathlib import Path

    if request.method == 'POST':
        user = User.objects.get(username='akbar')
        files_image = request.FILES['file']

        image_address = f"client/public/images/users/{user.username}/"
        try:
            Path(image_address).mkdir(parents=True)
        except FileExistsError:
            pass
        

        image = Image.open(files_image)
        image.save(image_address + "profile.webp")
        image.close()

        image_address = f"./images/users/{user.username}/"
        instance = models.UserInfo.objects.get(user_id=user)
        instance.profile_picture = (image_address + "profile.webp")
        instance.save()

        return Response("Success")


@api_view(('POST',))
def ChangePassword(request):
    if request.method == 'POST':
        user = User.objects.get(username='akbar')

        error = 0
        
        if not check_password(request.data['old_password'], user.password):
            error += 1
            response = "Old password is wrong"

        if request.data['new_password'] != request.data['confirm_new_password']:
            error += 1
            response = "Passwords don't match"
        
        if check_password(request.data['new_password'], user.password):
            error += 1
            response = "Choose a new password"
        
        if error == 0:    
            user.set_password(request.data['new_password'])
            user.save()
            response = "Success"

        return Response(response)


@api_view(('GET',))
def ReserveHistory(request):
    if request.method == 'GET':
        user = User.objects.get(username='akbar')
        
        # required fields: check in date - check out date, room number, room type, cost

        # serialized = ReserveHistorySerializer(
        #     models.BookedRoom.objects.filter(
        #         booking_id__in=models.Booking.objects.filter(user = user)
        #         ),
        #         many=True)

        serialized = ReserveHistorySerializer(
            models.Booking.objects.filter(
                user=user
                ),
                many=True)

        return Response(serialized.data)


@api_view(('POST', ))
def BookingReview(request):
    user = User.objects.get(username='akbar')
    if request.method == 'POST':
        reservation = models.Booking.objects.get(id=request.data['bookingId'])
        if reservation.user == user:
            if 0 <= request.data['rating'] <= 5:
                reservation.user_review = request.data['review']
                reservation.user_rating = request.data['rating']
                reservation.save()
                return Response("Success")
            else:
                return Response("Rating must be between 0 to 5")
        else:
            return Response("The submitted review belongs to a booking from some other user")


# For testing
'''
{
"username" : "samyar80",
"password" : "Akbar1234",
"confirmPassword" : "Akbar1234",
"firstName" : "Samyar",
"lastName" : "Afsharian",
"check" : "True"
}

{
"check_in" : "2022-08-17",
"check_out" : "2022-08-17",
"adults_count" : 2,
"children_count" : 2,
"rooms" : [{
"room_name" : "Villa",
"count" : 2
}
,
{
"room_name" : "Small King",
"count" : 1
}
]
}
'''