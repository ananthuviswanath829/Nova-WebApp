from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer #Ananthu
from rest_framework_simplejwt.views import TokenObtainPairView #Ananthu

from app_nova.serializers.account import * #Ananthu
from app_nova.services.account import * #Ananthu
from app_nova.models import Skill, Friends #Ananthu


##Serializer to include superuser status to access token
#Author-Ananthu
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_superuser'] = user.is_superuser
        token['is_verified_user'] = user.userprofile_set.get(is_active=True).is_verified
        return token


##Class to include superuser status to access token
#Author-Ananthu
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


##Class to register user
#Author-Ananthu
class RegisterAPI(ExceptionHandlerMixin, APIView):
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_register(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='User created successfully. Please verify your email')


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


##Class to get friends request count
#Author-Ananthu
class FriendRequestCountGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        friends_qs = Friends.objects.filter(is_active=True, is_accepted=False)
        request_sent_qs = friends_qs.filter(user=request.user)
        request_received_qs = friends_qs.filter(friend=request.user)
        return Response(status=status.HTTP_200_OK, data=request_sent_qs.count() + request_received_qs.count())