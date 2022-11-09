from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from app_nova.services.usermngmnt import * #Ananthu
from app_nova.serializers.usermngmnt import * #Ananthu


##Class to search
#Author-Ananthu
class SearchResultGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = users_get(request)
        serializer = UserSearchGetSerializer(queryset, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to add friend
#Author-Ananthu
class AddFriendAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddFriendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        add_friend(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Friend request sent successfully')