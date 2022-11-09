from django.urls import path #Ananthu
from app_nova.views import usermngmnt as um #Ananthu


urlpatterns = [
    path('search/result/get', um.SearchResultGetAPI.as_view()),
    path('add/friend', um.AddFriendAPI.as_view()),
]