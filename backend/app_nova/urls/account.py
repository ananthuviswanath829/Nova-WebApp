from django.urls import path #Ananthu
from app_nova.views import account #Ananthu

urlpatterns = [
    path('signup', account.RegisterAPI.as_view()),
]