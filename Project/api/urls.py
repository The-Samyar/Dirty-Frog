from . import views
from django.urls import path

app_name = 'api'

urlpatterns = [
    path('FeaturedRooms/', views.FeaturedRooms_component, name='FeaturedRooms'),
    path('Testimonials/', views.Testimonials_component, name='Testimonials'),
    # path('HeaderForm/', views.HeaderForm_component, name='HeaderForm'),
    path('Stats/', views.Stats_component, name='Stats'),
    path('BookNow/', views.BookNow, name='BookNow')
]