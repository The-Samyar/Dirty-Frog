from . import views
from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = 'api'


urlpatterns = [
    path('FeaturedRooms/', views.FeaturedRooms_component, name='FeaturedRooms'),
    path('Testimonials/', views.Testimonials_component, name='Testimonials'),
    # path('HeaderForm/', views.HeaderForm_component, name='HeaderForm'),
    path('Stats/', views.Stats_component, name='Stats'),
    path('BookNow/', views.BookNow, name='BookNow'),
    path('Rooms/', views.Rooms, name='Rooms'),
    path('Rooms/<room_name>/', views.Rooms),
    path('BookingInfo/',views.BookingInfo, name='BookingInfo'),
    path('Booking/',views.Booking, name='Booking'),
    path('SignUp/', views.SignUp, name='SignUp'),
    path('SignIn/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/data/', views.ProfileData, name='ProfileData'),
    path('profile/change-password/', views.ChangePassword, name='ChangePassword'),
    path('profile/reserve-history/', views.ReserveHistory, name='ReserveHistory'),
]