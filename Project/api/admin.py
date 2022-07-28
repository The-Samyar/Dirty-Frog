from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.RoomType)
admin.site.register(models.RoomPicture)
admin.site.register(models.RoomService)
admin.site.register(models.Room)
admin.site.register(models.Booking)
admin.site.register(models.UserInfo)
admin.site.register(models.Review)
