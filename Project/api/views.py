from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from datetime import date, timedelta
from django.db.models import Sum, Q, Count, F
from django.contrib.auth.hashers import check_password, make_password

from .serializers import *
from . import models

from django.contrib.auth.models import User

from PIL import Image
from pathlib import Path


@api_view(('GET',))
def FeaturedRooms_component(request):
    # returns 3 manually selected featured rooms
    room_types = models.RoomType.objects.filter(
        Q(room_name='Premium King') | Q(room_name='Premium Royal') | Q(room_name='Premium Sea View')
        )
    
    room_types_serialized = RoomTypeSerializer(
        room_types,
        many=True,
        fields=('room_name', 'cost_per_day','description', 'room_pictures')
        )
    return Response(room_types_serialized.data)


@api_view(('GET',))
def Testimonials_component(request):
    # returns top 9 best reviews
    reviews = models.Review.objects.all().order_by('rate')[:9]
    reviews_serialized = ReviewSerializer(reviews, many=True)
    return Response(reviews_serialized.data)
    

@api_view(('GET',))
def Stats_component(request):
    # returns a summary info about hotel regarding current guest count, staff count, 
    guests = models.Booking.objects.filter(check_in__lte=date.today(),check_out__gte = date.today()).count()
    rooms = models.RoomType.objects.aggregate(total=Sum('room_count'))['total']
    STAFF = 200
    positive_ratings = models.Review.objects.filter(rate__gte = 4).count()

    json_response = {
        "guests_count" : guests,
        "rooms_count" : rooms,
        "staff_count" : STAFF,
        "positive_ratings_count" : positive_ratings,
    }

    return Response(json_response)


@api_view(("GET","POST"))
def RoomAvailability(request):

    if request.method == 'GET':
        today = date.today()
        tomorrow = today + timedelta(days=1)
        total_guests='1'

        bookings = models.Booking.objects.exclude(
            check_out__lte=today
            ).exclude(
                Q(check_in__lt=today, check_out__lte=today) | Q(check_in__gte=tomorrow, check_out__gt=tomorrow)
                )

        booked_rooms = models.BookedRoom.objects.filter(booking_id__in=bookings).values_list('room_number', flat=True)

        rooms = models.RoomType.objects.annotate(
                vacant_count=Count(
                    'room', filter=~Q(room__room_number__in=booked_rooms), default=0
                    )
                ).filter(
                    vacant_count__gte=1
                    )

        returned_serialized = BookRoomSerializer(rooms, many=True)
        return Response(returned_serialized.data)
    
    elif request.method == 'POST':
        serialized_data = HeaderFormSerializer(data=request.data)

        if serialized_data.is_valid():
            valid_data = serialized_data.validated_data

            total_guests = valid_data['adults'] + valid_data['children']
            check_in = valid_data['checkIn']
            check_out = valid_data['checkOut']
            today = date.today()

            bookings = models.Booking.objects.exclude(
                check_out__lte=today
                ).exclude(
                    Q(check_in__lt=check_in, check_out__lte=check_in) | Q(check_in__gte=check_out, check_out__gt=check_out)
                    )

            booked_rooms = models.BookedRoom.objects.filter(booking_id__in=bookings).values_list('room_number', flat=True)

            
            rooms = models.RoomType.objects.annotate(
                    vacant_count=Count(
                        'room', filter=~Q(room__room_number__in=booked_rooms)
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
            response = {
                "Error" : serialized_data.errors,
                "Data" : ""
            }

        return Response(data = response)


@api_view(("GET",))
def Rooms(request, room_name=None):
    if room_name:
        # returns all rooms pictures along with their name if room name is not empty in the url, otherwise returns the particular rooms complete info 

        # Convert slug to string
        room_name = room_name.replace('-', ' ')

        room = models.RoomType.objects.get(room_name=room_name)
        serialized_rooms = RoomTypeSerializer(room, context={"minimised_services": True})

    else:
        rooms = models.RoomType.objects.all()
        serialized_rooms = RoomTypeSerializer(rooms, many=True, fields=("room_name", "room_pictures"))

    return Response(serialized_rooms.data)


@api_view(("POST",))
@permission_classes([IsAuthenticated])
def BookingInfo(request):
    # returns rooms info when user is booking

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
    # user sign up
    if request.method == 'POST':
        serialized = UserRegisterSerializer(data=request.data)
        if serialized.is_valid():
            validated = serialized.validated_data

            if validated['check'] == True and validated['password'] == validated['confirm_password']:
                new_user = User.objects.create_user(
                    username=validated['username'],
                    password=validated['password'],
                    first_name=validated['first_name'],
                    last_name=validated['last_name']
                    )
                
                new_user.save()
                new_userinfo = models.UserInfo(
                    user = new_user
                )
                new_userinfo.save()
                response = {'message': 'success'}
            else:
                response = {'message': 'error'}
        else:
            response = {'message': f'{serialized.errors}'}
        return Response(response)

@api_view(("POST",))
@permission_classes([IsAuthenticated])
def Booking(request):
    if request.method == 'POST':
        serialized = BookingModelSerializer(data=request.data)
        if serialized.is_valid():
            validated = serialized.validated_data
            user = request.user

            rooms = validated["rooms"]

            today = date.today()
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
@permission_classes([IsAuthenticated])
def ProfileData(request):
    # returns user's complete info on GET, saves edited changes on POST
    user = request.user
    today = date.today()
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
        for row in request.data:
            if user_info[row] != request.data[row]:

                if hasattr(user, row):
                    setattr(user, row, request.data[row])
                    user.save()
                else:
                    setattr(user.userinfo, row, request.data[row])
                    user.userinfo.save()

        return Response("Information was successfully edited")

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def ProfileImage(request):
    # saves user profile image file in images directory, also saves the image path in database

    if request.method == 'POST':
        user = request.user
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
        instance = models.UserInfo.objects.get(user=user)
        instance.profile_picture = (image_address + "profile.webp")
        instance.save()

        return Response("Success")


@api_view(('POST',))
@permission_classes([IsAuthenticated])
def ChangePassword(request):
    # changes user password
    if request.method == 'POST':
        user = request.user
        
        if check_password(request.data['old_password'], user.password):
            if request.data['new_password'] == request.data['confirm_new_password']:
                if not check_password(request.data['new_password'], user.password):
                    user.set_password(request.data['new_password'])
                    user.save()
                    response = "Success"
                else:
                    response = "Choose a new password"
            else:
                response = "Passwords don't match"
        else:
            response = "Old password is wrong"

        return Response(response)


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def ReserveHistory(request):
    # returns user's booking history
    if request.method == 'GET':
        user = request.user
        serialized = ReserveHistorySerializer(
            models.Booking.objects.filter(
                user=user
                ),
            many=True
            )

        return Response(serialized.data)


@api_view(('POST', ))
@permission_classes([IsAuthenticated])
def BookingReview(request):
    user = request.user
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