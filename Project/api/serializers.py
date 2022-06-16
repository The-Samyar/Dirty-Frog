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

    def validate(self, data):
        errors = {}
        # checkIn before checkOut
        if data['checkIn'] and data['checkOut']:
            if data['checkIn'] > data['checkOut']:
                errors["checkOut"] = "Submitted check out date must be after check in date"

        # checkIn and checkOut before today's date
        if data['checkIn'] and data['checkOut']:
            
            # today's date : %Y-%m-%d
            today = datetime.now().date()

            if data['checkIn'] < today:
                errors['checkIn'] = "Submitted check in date must not be before today's date"
            
            if data['checkOut'] < today:
                errors['checkOut'] = "Submitted check out date must not be before today's date"

        # rooms between 1-6 inclusive
        if data['rooms']:
            if data['rooms'] > 6 or data['rooms'] < 1:
                errors['rooms'] = "Submitted number of rooms must be between 1 to 6 (inclusive)"

        # adults between 1-6 inclusive
        if data['adults']:
            if data['adults'] > 6 or data['adults'] < 1:
                errors['adults'] = "Submitted number of adults must be between 1 to 6 (inclusive)"

        # children between 0-6 inclusive
        if data['children']:
            if data['children'] > 6 or data['children'] < 0:
                errors['children'] = "Submitted number of children must be between 0 to 6 (inclusive)"
        if errors:
            raise serializers.ValidationError(errors)

        return data