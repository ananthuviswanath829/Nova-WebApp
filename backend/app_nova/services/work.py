from datetime import date, datetime #Ananthu

from django.db.models import Q #Ananthu 
from django.contrib.auth.models import User #Ananthu
from django.core.exceptions import ValidationError #Ananthu

from app_nova.models import Work #Ananthu
from app_nova.services import service_log #Ananthu


##Function to get work list
#Author-Ananthu
def works_get(request):
    works_qs = Work.objects.filter(Q(is_active=True, created_by=request.user)|Q(is_active=True, assigned_to=request.user))
    return works_qs


##Function to create work
#Author-Ananthu
def work_create(request, work_name: str, start_date: date, end_date: date, status: str, user_id: int, description: str):
    try:
        user = request.user
        assigned_to = User.objects.get(is_active=True, id=user_id)

        work_obj = Work(
            assigned_to = assigned_to,
            name = work_name,
            start_date = start_date,
            end_date = end_date,
            status = status,
            description = description,
            created_by = user,
            modified_by = user,
        )
        work_obj.full_clean()
        work_obj.save()
    except User.DoesNotExist:
        err = f'User does not exist, id - {user_id}'
        service_log.log_save('Work Create', err, user.username, 0)
        raise ValidationError(err)


##Function to get work
#Author-Ananthu
def work_get(request):
    try:
        work_id = request.GET.get('work_id')
        return Work.objects.get(is_active=True, id=work_id)
    except Work.DoesNotExist:
        err = f'User does not exist, id - {work_id}'
        service_log.log_save('Work Get', err, request.user.username, 0)
        raise ValidationError(err)


##Function to edit work
#Author-Ananthu
def work_edit(request, work_id: int, work_name: str, start_date: date, end_date: date, status: str, user_id: int, description: str):
    try:
        user = request.user
        assigned_to = User.objects.get(is_active=True, id=user_id)
        work_obj = Work.objects.get(is_active=True, id=work_id)

        work_obj.assigned_to = assigned_to
        work_obj.name = work_name
        work_obj.start_date = start_date
        work_obj.end_date = end_date
        work_obj.status = status
        work_obj.description = description
        work_obj.modified_by = user
        work_obj.modified_date = datetime.now()
        work_obj.full_clean()
        work_obj.save()
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)
    except User.DoesNotExist:
        err = f'User does not exist, id - {user_id}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)


##Function to delete work
#Author-Ananthu
def work_delete(request, work_id: int):
    try:
        user = request.user
        work_obj = Work.objects.get(is_active=True, id=work_id)
        work_obj.is_active = False
        work_obj.modified_by = user
        work_obj.modified_date = datetime.now()
        work_obj.save()
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)