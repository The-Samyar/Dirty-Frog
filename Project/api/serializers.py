from rest_framework import serializers
from . import models

class RoomPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomPicture
        fields = "__all__"

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
