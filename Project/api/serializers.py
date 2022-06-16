from rest_framework import serializers
from . import models
from datetime import datetime

class RoomPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomPicture
        fields = "__all__"

class BookRoomSerializer(serializers.Serializer):
    room_name = serializers.CharField()
    cost_per_day = serializers.IntegerField()
    size = serializers.IntegerField()
    capacity = serializers.IntegerField()
    vacant_count = serializers.IntegerField()
    description = serializers.CharField()
    room_pictures = serializers.SlugRelatedField(many=True, read_only=True, slug_field="picture_address")

class RoomTypeSerializer(serializers.ModelSerializer):
    room_pictures = serializers.SlugRelatedField(many=True, read_only=True, slug_field="picture_address")

    class Meta:
        model = models.RoomType
        fields = ['room_name', 'cost_per_day', 'size', 'capacity', 'booked_count', 'description', 'room_pictures']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = "__all__"

class HeaderFormSerializer(serializers.Serializer):
    checkIn = serializers.DateField()
    checkOut = serializers.DateField()
    rooms = serializers.IntegerField()
    adults = serializers.IntegerField()
    children = serializers.IntegerField()