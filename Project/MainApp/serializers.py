from rest_framework import serializers
from . import models

class RoomPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomPicture
        field = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        field = "__all__"