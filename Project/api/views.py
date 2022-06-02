from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import date
from django.db.models import Sum

from .serializers import RoomTypeSerializer, ReviewSerializer, HeaderFormSerializer
from . import models



@api_view(('GET',))
def FeaturedRooms_component(request):
    room_types = models.RoomType.objects.all()
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


@api_view(('POST',))
def HeaderForm_component(request):
    if request.method == 'POST':
        serialized_data = HeaderFormSerializer(data=request.data)
        if serialized_data.is_valid():
            # print("valid")
            # print(request.data)
            # Assuming that data is valid:
            valid_data = serialized_data.validated_data
            # Filtering rooms based on number of guest:
            rooms = models.RoomType.objects.filter(capacity__gte = int(valid_data['adults'] + valid_data['children']))
            vacant_rooms = models.RoomVacancy.objects.filter(is_vacant = True).filter(room_name__in=rooms)
            return Response(vacant_rooms)
        else:
            print("invalid")
            print(serialized_data.errors)
            return Response(None)           
