from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from app_nova.serializers.work import * #Ananthu
from app_nova.services.work import * #Ananthu


##Class to get works list
#Author-Ananthu
class WorkListGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = WorkListGetSerializer(works_get(request), many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to create work
#Author-Ananthu
class WorkCreateAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = WorkCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        work_create(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Work created successfully')


##Class to get works details
#Author-Ananthu
class WorkDetailsGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = WorkDetailsGetSerializer(work_get(request), context={'request': request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to edit work
#Author-Ananthu
class WorkEditAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = WorkEditSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        msg = work_edit(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data=msg)


##Class to delete work
#Author-Ananthu
class WorkDeleteAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, work_id):
        work_delete(request=request, work_id=work_id)
        return Response(status=status.HTTP_200_OK, data='Work deleted successfully')


##Class to save work comment
#Author-Ananthu
class WorkCommentSaveAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = WorkCommentSaveSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment_save(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Comment saved successfully')


##Class to get comments list
#Author-Ananthu
class WorkCommentListGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = WorkCommentListGetSerializer(comments_get(request), many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to get etherium status
#Author-Ananthu
class EtheriumStatusGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(status=status.HTTP_200_OK, data=etherium_status_get(request))
    

##Class to transfer etherium
#Author-Ananthu
class EtheriumTransactionAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EtheriumTransactionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        msg = transfer_etherium(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data=msg)