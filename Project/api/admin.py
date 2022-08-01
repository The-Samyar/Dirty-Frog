from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.RoomType)

admin.site.register(models.RoomPicture)

admin.site.register(models.RoomService)

admin.site.register(models.Room)

class BookingAdmin(admin.ModelAdmin):
    readonly_fields = ["_total_cost"]

admin.site.register(models.Booking, BookingAdmin)

admin.site.register(models.UserInfo)

admin.site.register(models.Review)
