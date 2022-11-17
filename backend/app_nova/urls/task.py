from django.urls import path #Ananthu
from app_nova.views import task #Ananthu


urlpatterns = [
    path('create', task.TaskCreateAPI.as_view()),
    path('edit', task.TaskEditAPI.as_view()),
    path('delete/<int:task_id>', task.TaskDeleteAPI.as_view()),
]