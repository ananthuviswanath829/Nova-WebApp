from datetime import datetime #Ananthu

from django.core.exceptions import ValidationError #Ananthu

from app_nova.services import service_log #Ananthu
from app_nova.models import UserTask #Ananthu


##Function to create Task
#Author-Ananthu
def task_create(request, task_name: str, hours: int):
    user = request.user

    task_obj = UserTask(
        user = user,
        task_name = task_name,
        hours = hours,
        created_by = user,
        modified_by = user,
    )
    task_obj.full_clean()
    task_obj.save()


##Function to edit task
#Autho-Ananthu
def task_edit(request, task_id: int, task_name: str, hours: int):
    try:
        task_obj = UserTask.objects.get(is_active=True, id=task_id)
        task_obj.task_name = task_name
        task_obj.hours = hours
        task_obj.modified_by = request.user
        task_obj.modified_date = datetime.now()
        task_obj.full_clean()
        task_obj.save()
    except UserTask.DoesNotExist:
        err = f'Task does not exist, id - {task_id}'
        service_log.log_save('Task Edit', err, request.user.username, 0)
        raise ValidationError(err)


##Function to delete task
#Author-Ananthu
def task_delete(request, task_id: int):
    try:
        task_obj = UserTask.objects.get(is_active=True, id=task_id)
        task_obj.is_active = False
        task_obj.modified_by = request.user
        task_obj.modified_date = datetime.now()
        task_obj.full_clean()
        task_obj.save()
    except UserTask.DoesNotExist:
        err = f'Task does not exist, id - {task_id}'
        service_log.log_save('Task Delete', err, request.user.username, 0)
        raise ValidationError(err)


##Function to get task obj
#Author-Ananthu
def task_get(request):
    try:
        task_id = request.GET.get('task_id')
        if task_id in [None, '']:
            err = f'Task does not exist, id - {task_id}'
            service_log.log_save('Task Get', err, request.user.username, 0)
            raise ValidationError(err)
        
        return UserTask.objects.get(is_active=True, id=task_id)
    except UserTask.DoesNotExist:
        err = f'Task does not exist, id - {task_id}'
        service_log.log_save('Task Delete', err, request.user.username, 0)
        raise ValidationError(err)