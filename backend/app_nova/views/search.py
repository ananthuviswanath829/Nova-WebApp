from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from app_nova.services.search import * #Ananthu
from app_nova.serializers.search import * #Ananthu


##Class to search
#Author-Ananthu
class SearchResultGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = users_get(request)
        serializer = UserSearchGetSerializer(queryset, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)