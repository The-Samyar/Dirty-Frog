from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from .serializers import RoomPictureSerializer, ReviewSerializer
from . import models

def Homepage(request):
    if request.method == 'GET':
        review = models.Review.objects.all()
        serialized = RoomPictureSerializer(review)
        se = RoomPictureSerializer()
        return Response(serialized.data)

    elif request.method == 'POST':

        pass
