from . import views
from django.urls import path

app_name = 'MainApp'

urlpatterns = [
    path('home/', views.Homepage, name='home')
]