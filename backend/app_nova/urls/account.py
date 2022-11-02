from django.urls import path #Ananthu
from app_nova.views import account #Ananthu

urlpatterns = [
    path('signup', account.RegisterAPI.as_view()),
    path('check/verification/token', account.CheckVerificationToken.as_view()),
]