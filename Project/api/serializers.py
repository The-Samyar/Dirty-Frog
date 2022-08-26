from rest_framework import serializers
from . import models
from datetime import datetime
from django.contrib.auth.models import User

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
    # description = serializers.CharField()
    # room_pictures = serializers.SlugRelatedField(many=True, read_only=True, slug_field="picture_address")
    services = serializers.SlugRelatedField(many=True, read_only=True, slug_field='services_full_info')

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)



class RoomTypeSerializer(DynamicFieldsModelSerializer):
    room_pictures = serializers.SlugRelatedField(many=True, read_only=True, slug_field="picture_address")
    # services = serializers.SlugRelatedField(many=True, read_only=True, slug_field='services_full_info')
    services = serializers.SerializerMethodField()

    class Meta:
        model = models.RoomType
        # fields = '__all__'
        fields = ['room_name', 'cost_per_day', 'size', 'capacity', 'booked_count', 'description', 'room_pictures', 'services']

    def get_services(self, obj):
        queryset = [service.services_full_info for service in models.RoomService.objects.filter(room_name = obj.room_name)]
        if self.context.get("minimised_services"):
            return queryset[:6]
        else:
            return queryset


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Review
        fields = ['first_name', 'review', 'rate']

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
                error_message = "Submitted check-out date must be after check-in date"
                try:
                    errors['checkOut'].append(error_message)
                except KeyError:
                    errors['checkOut'] = [error_message]


        # checkIn and checkOut before today's date
        if data['checkIn'] and data['checkOut']:
            
            # today's date : %Y-%m-%d
            today = datetime.now().date()

            if data['checkIn'] < today:
                error_message = "Submitted check-in date must not be before today's date"
                try:
                    errors['checkIn'].append()
                except KeyError:
                    errors['checkIn'] = [error_message]

            if data['checkOut'] < today:
                error_message = "Submitted check-out date must not be before today's date"
                try:
                    errors['checkOut'].append(error_message)
                except KeyError:
                    errors['checkOut'] = [error_message]

        # rooms less than equal to total number of guests
        if data['rooms'] and data['adults'] and data['children']:
            if data['rooms'] > data['adults'] + data['children']:
                error_message = "Submitted number of rooms must not exceed the total number of guests"
                try:
                    errors['rooms'].append(error_message)
                except KeyError:
                    errors['rooms'] = [error_message]

        # rooms between 1-6 inclusive
        if data['rooms']:
            if data['rooms'] > 6 or data['rooms'] < 1:
                error_message = "Submitted number of rooms must be between 1 to 6 (inclusive)"
                try:
                    errors['rooms'].append(error_message)
                except KeyError:
                    errors['rooms'] = [error_message]

        # adults between 1-6 inclusive
        if data['adults']:
            if data['adults'] > 6 or data['adults'] < 1:
                error_message = "Submitted number of adults must be between 1 to 6 (inclusive)"
                try:
                    errors['adults'].append(error_message)
                except KeyError:
                    errors['adults'] = [error_message]

        # children between 0-6 inclusive
        if data['children']:
            if data['children'] > 6 or data['children'] < 0:
                error_message = "Submitted number of children must be between 0 to 6 (inclusive)"
                try:
                    errors['children'].append(error_message)
                except KeyError:
                    errors['children'] = [error_message]

        if errors:
            raise serializers.ValidationError(errors)
            
        return data

class BookingRoomInfoSerializer(serializers.Serializer):
    room_name = serializers.CharField()
    count = serializers.IntegerField()

class BookingModelSerializer(DynamicFieldsModelSerializer):
    rooms = BookingRoomInfoSerializer(many=True)

    class Meta:
        model = models.Booking
        fields = ('check_in', 'check_out', 'adults_count', 'children_count', 'rooms')

class UserRegisterSerializer(DynamicFieldsModelSerializer):
    TERMS_AND_CONDITONS_CHOICES = [
        ('True'),
        ('False')
    ]
    
    confirm_password = serializers.CharField()

    check = serializers.ChoiceField(choices=TERMS_AND_CONDITONS_CHOICES)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'password', 'confirm_password', 'check')


