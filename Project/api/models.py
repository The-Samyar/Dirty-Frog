from django.db import models
from django.contrib.auth.models import User

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
    room_name = models.ManyToManyField(RoomType)
    service = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.service}"

class RoomVacancy(models.Model):
    room_number = models.IntegerField(unique=True)
    room_name = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    is_vacant = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.room_number} vacancy: -->{self.is_vacant}"

#  -----------------------------------


#  ----Tables related to bookings----
class Booking(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    room_number = models.IntegerField()
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    adults_count = models.IntegerField()
    children_count = models.IntegerField()
    total_cost = models.IntegerField()
    def __str__(self):
        return self.user_id

# -----------------------------------

#  ---Table for user's info---
class UserInfo(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14 ,blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=6 ,blank=True, null=True)
    # profile_picture = models.ImageField(upload_to='')
    profile_picture = models.ImageField(blank=True, null=True)
    def __str__(self):
        return self.user_id.username


class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.TextField()
    rate = models.IntegerField()
    def __str__(self):
        return f"By {self.user_id.username}"
# -----------------------------
