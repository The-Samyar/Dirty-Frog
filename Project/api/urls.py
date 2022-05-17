from . import views
from django.urls import path

app_name = 'MainApp'

urlpatterns = [
    path('', views.Homepage, name='home')
]