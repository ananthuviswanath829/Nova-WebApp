from django.urls import path #Ananthu
from app_nova.views import account #Ananthu


urlpatterns = [
    path('signup', account.RegisterAPI.as_view()),
    path('check/verification/token', account.CheckVerificationToken.as_view()),

    path('all/skills/get', account.AllSkillsGet.as_view()),
    path('profile/edit', account.UserProfileEditAPI.as_view()),
    path('profile/get', account.UserProfileGetAPI.as_view()),
    path('friend/request/count/get', account.FriendRequestCountGetAPI.as_view()),
]