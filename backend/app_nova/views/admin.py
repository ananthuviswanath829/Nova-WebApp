from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated, IsAdminUser #Ananthu

from django.contrib.auth.models import User #Ananthu
from django.db.models import Q #Ananthu

from app_nova.serializers.admin import * #Ananthu
from app_nova.services.admin import * #Ananthu


##Class to get works list
#Author-Ananthu
class UserListGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        serializer = UserListGetSerializer(users_get(request.GET.get('search_term')), many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to toggle user
#Author-Ananthu
class ToggleUserAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, user_id):
        User.objects.filter(id=user_id).update(is_active=Q(is_active=False))
        return Response(status=status.HTTP_200_OK, data='Work deleted successfully')


##Class to get works list
#Author-Ananthu
class TransactionListGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        serializer = TransactionListGetSerializer(transactions_get(request.GET.get('search_term')), many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)