from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from app_nova.serializers.account import * #Ananthu
from app_nova.services.account import * #Ananthu
from app_nova.models import Skill #Ananthu


##Class to register user
#Author-Ananthu
class RegisterAPI(ExceptionHandlerMixin, APIView):
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_register(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='User created successfully')


##Class to check email verification token
#Author-Ananthu
class CheckVerificationToken(ExceptionHandlerMixin, APIView):

    def get(self, request):
        token = request.GET.get('token')
        verify_token(token)
        return Response(status=status.HTTP_200_OK, data='Token verified successfully')


##Class to get all skills
#Author-Ananthu
class AllSkillsGet(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Skill.objects.filter(is_active=True).order_by('id')
        serializer = AllSkillsGetSerializer(queryset, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to register user
#Author-Ananthu
class UserProfileEditAPI(ExceptionHandlerMixin, APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserProfileEditSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_profile_Edit(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Profile edited successfully')


##Class to get all skills
#Author-Ananthu
class UserProfileGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileGetSerializer(request.user)
        return Response(status=status.HTTP_200_OK, data=serializer.data)