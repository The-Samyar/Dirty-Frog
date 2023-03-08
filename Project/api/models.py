from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from .models import *
""" from numpy import empty """

#  ------Tables related to rooms------
class RoomType(models.Model):
    room_name = models.CharField(
        primary_key=True,
        max_length=20)
    cost_per_day = models.IntegerField()
    size = models.IntegerField()
    capacity = models.IntegerField()
    bed = models.CharField(max_length=30)
    room_count = models.IntegerField()
    booked_count = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.room_name
    

class RoomPicture(models.Model):
    room_name = models.ForeignKey(
        RoomType,
        on_delete=models.CASCADE,
        related_name='room_pictures')
    picture_address = models.CharField(max_length=50)
    def __str__(self):
        # REDO
        # return self.room_name.room_name
        return f"{self.room_name.room_name} | {self.picture_address}"

class RoomService(models.Model):
    room_name = models.ManyToManyField(RoomType, related_name='services')
    service = models.CharField(max_length=50)

    @property
    def services_full_info(self):
        return {self.id : self.service}

    def __str__(self):
        return f"{self.service}"

class Room(models.Model):
    room_number = models.IntegerField(primary_key=True)
    room_name = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    # is_vacant = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.room_number}, {self.room_name}"

#  -----------------------------------


#  ----Tables related to bookings----
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # room_number = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    adults_count = models.IntegerField()
    children_count = models.IntegerField()
    user_review = models.TextField(null=True, blank=True)
    user_rating = models.IntegerField(null=True, blank=True)

    # Read-only field - automatically calculated
    _total_cost = models.FloatField(blank=True, null=True)

    @property
    def total_cost(self):
        return self._total_cost

    def __str__(self):
        return f"{self.id} | Booked by {self.user.first_name} {self.user.last_name}"


class BookedRoom(models.Model):
    room_number = models.ForeignKey(Room, on_delete=models.CASCADE)
    booking_id = models.ForeignKey(Booking, on_delete=models.CASCADE)

    def __str__(self):
        return f"Booking ID {self.booking_id}"

# -----------------------------------

#  ---Table for user's info---
class UserInfo(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14 ,blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=6 ,blank=True, null=True)
    # profile_picture = models.ImageField(upload_to='')
    profile_picture = models.CharField(max_length=40, default="")

    def __str__(self):
        return self.user_id.username


class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.TextField(blank=True, null=True)
    rate = models.IntegerField()

    @property
    def first_name(self):
        return self.user_id.first_name

    def __str__(self):
        return f"By {self.user_id.first_name}"
# -----------------------------
