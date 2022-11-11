from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from common.mixins import ExceptionHandlerMixin #Ananthu

from app_nova.services.usermngmnt import * #Ananthu
from app_nova.serializers.usermngmnt import * #Ananthu
from app_nova.serializers.account import UserProfileGetSerializer #Ananthu
from app_nova.models import Friends #Ananthu


##Class to search
#Author-Ananthu
class SearchResultGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = users_get(request)
        serializer = UserSearchGetSerializer(queryset, many=True, context={'request': request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to add friend
#Author-Ananthu
class AddFriendAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FriendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        add_friend(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Friend request sent successfully')


##Class to search
#Author-Ananthu
class PersonProfileGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_obj = user_get(request)
        serializer = UserProfileGetSerializer(user_obj)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to get friends list
#Author-Ananthu
class FriendsListGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        friends_qs = Friends.objects.select_related('user', 'friend').filter(is_active=True)
        request_sent_qs = friends_qs.filter(user=request.user)
        request_received_qs = friends_qs.filter(friend=request.user)
        request_sent_serializer = FriendsGetSerializer(request_sent_qs, many=True, context={'type': 'request sent'})
        request_recieved_serializer = FriendsGetSerializer(request_received_qs, many=True, context={'type': 'request received'})
        return Response(status=status.HTTP_200_OK, data=request_sent_serializer.data + request_recieved_serializer.data)


##Class to accept friend request
#Author-Ananthu
class FriendRequestAcceptAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FriendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        friend_request_accept(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Friend request accepted successfully')


##Class to cancel friend request
#Author-Ananthu
class FriendRequesCancelAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FriendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        friend_request_cancel(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Friend request accepted successfully')