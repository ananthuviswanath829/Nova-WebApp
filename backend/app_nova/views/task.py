from rest_framework.views import APIView #Ananthu
from rest_framework.response import Response #Ananthu
from rest_framework import status #Ananthu
from common.mixins import ExceptionHandlerMixin #Ananthu
from rest_framework.permissions import IsAuthenticated #Ananthu

from app_nova.serializers.task import * #Ananthu
from app_nova.services.task import * #Ananthu


##Class to create task
#Author-Ananthu
class TaskCreateAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task_create(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Task created successfully')


##Class to edit task
#Author-Ananthu
class TaskEditAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TaskEditSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task_edit(request=request, **serializer.validated_data)

        return Response(status=status.HTTP_200_OK, data='Task edited successfully')


##Class to delete task
#Author-Ananthu
class TaskDeleteAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, task_id):
        task_delete(request=request, task_id=task_id)
        return Response(status=status.HTTP_200_OK, data='Task deleted successfully')


##Class to get task details
#Author-Ananthu
class TaskDetailsGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = TaskDetailsGetSerializer(task_get(request))
        return Response(status=status.HTTP_200_OK, data=serializer.data)


##Class to get task details
#Author-Ananthu
class WeeklyTasksGetAPI(ExceptionHandlerMixin, APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(status=status.HTTP_200_OK, data=weekly_tasks_get(request))