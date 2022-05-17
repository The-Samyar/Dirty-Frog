from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import RoomTypeSerializer, ReviewSerializer
from . import models

@api_view(('GET','POST'))
def Homepage(request):
    if request.method == 'GET':
        # TODO
        # customer count, positive ratings
        room_types = models.RoomType.objects.all()
        room_types_serialized = RoomTypeSerializer(room_types, many=True)

        reviews = models.Review.objects.all().order_by('rate')[:9]
        reviews_serialized = ReviewSerializer(reviews, many=True)
        for item in room_types_serialized.data:
            item = dict(item)
        for item in reviews_serialized.data:
            item = dict(item)
        json_response = [
            {"room_types" : room_types_serialized.data},
            {"reviews" : reviews_serialized.data}
        ]
        return Response(json_response)
