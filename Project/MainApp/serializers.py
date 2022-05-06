from pyexpat import model
from rest_framework import serializers
from . import models

class RoomPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomPicture
        field = "__all__"