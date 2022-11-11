from django.urls import path #Ananthu
from app_nova.views import usermngmnt as um #Ananthu


urlpatterns = [
    path('search/result/get', um.SearchResultGetAPI.as_view()),
    path('add/friend', um.AddFriendAPI.as_view()),
    path('person/profile/get', um.PersonProfileGetAPI.as_view()),
    path('friends/list/get', um.FriendsListGetAPI.as_view()),
    path('friend/request/accept', um.FriendRequestAcceptAPI.as_view()),
    path('friend/request/cancel', um.FriendRequesCancelAPI.as_view()),
]