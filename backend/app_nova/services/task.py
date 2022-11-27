from datetime import datetime, date, timedelta #Ananthu

from django.core.exceptions import ValidationError #Ananthu
from django.db.models import F, Sum #Ananthu
from django.db import transaction #Ananthu

from app_nova.services import service_log #Ananthu
from app_nova.models import UserTask, UserProfile #Ananthu


##Function to create Task
#Author-Ananthu
def task_create(request, task_name: str, task_date: date, start_time: timedelta, end_time: timedelta):
    user = request.user

    with transaction.atomic():
        task_obj = UserTask(
            user = user,
            task_name = task_name,
            task_date = task_date,
            start_time = start_time,
            end_time = end_time,
            created_by = user,
            modified_by = user,
        )
        task_obj.full_clean()
        task_obj.save()

        if task_name.lower() == 'open to work':
            end_time_delta = timedelta(hours=end_time.hour,  minutes=end_time.minute, seconds=end_time.second)
            start_time_delta = timedelta(hours=start_time.hour,  minutes=start_time.minute, seconds=start_time.second)
            delta = end_time_delta - start_time_delta
            user.userprofile_set.filter(is_active=True).update(availability=F('availability') + delta)


##Function to edit task
#Autho-Ananthu
def task_edit(request, task_id: int, task_name: str, task_date: date, start_time: timedelta, end_time: timedelta):
    try:
        user = request.user
        task_obj = UserTask.objects.get(is_active=True, id=task_id)

        with transaction.atomic():
            task_obj.task_name = task_name
            task_obj.task_date = task_date
            task_obj.start_time = start_time
            task_obj.end_time = end_time
            task_obj.modified_by = user
            task_obj.modified_date = datetime.now()
            task_obj.full_clean()
            task_obj.save()

            if task_name.lower() == 'open to work':
                total_time = UserTask.objects.filter(
                        is_active = True, user = user, task_name__iexact = 'open to work'
                    ).exclude(
                        id = task_id
                    ).annotate(
                        available_time = F('end_time') - F('start_time')
                    ).aggregate(
                        total_time = Sum('available_time')
                )['total_time']
                total_time = timedelta(minutes=0) if total_time is None else total_time
                end_time_delta = timedelta(hours=end_time.hour,  minutes=end_time.minute, seconds=end_time.second)
                start_time_delta = timedelta(hours=start_time.hour,  minutes=start_time.minute, seconds=start_time.second)
                delta = end_time_delta - start_time_delta
                user.userprofile_set.filter(is_active=True).update(availability=total_time + delta)
    except UserTask.DoesNotExist:
        err = f'Task does not exist, id - {task_id}'
        service_log.log_save('Task Edit', err, user.username, 0)
        raise ValidationError(err)


##Function to delete task
#Author-Ananthu
def task_delete(request, task_id: int):
    try:
        user = request.user
        task_obj = UserTask.objects.get(is_active=True, id=task_id)

        with transaction.atomic():
            task_obj.is_active = False
            task_obj.modified_by = user
            task_obj.modified_date = datetime.now()
            task_obj.full_clean()
            task_obj.save()

            if task_obj.task_name.lower() == 'open to work':
                end_time_delta = timedelta(hours=task_obj.end_time.hour,  minutes=task_obj.end_time.minute, seconds=task_obj.end_time.second)
                start_time_delta = timedelta(hours=task_obj.start_time.hour,  minutes=task_obj.start_time.minute, seconds=task_obj.start_time.second)
                delta = end_time_delta - start_time_delta
                user.userprofile_set.filter(is_active=True).update(availability=F('availability') - delta)
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


##Function to get weekly tasks
#Author-Ananthu
def weekly_tasks_get(request):
    user = request.user
    count = request.GET.get('count')
    delta = timedelta(days=int(count))
    weeks_date_list = get_week_dates(date.today() + delta, 1, 7)
    week_task_qs = UserTask.objects.filter(is_active=True, user=user)

    task_list = []
    for week_date in weeks_date_list:
        day_task_qs = week_task_qs.filter(task_date=week_date).order_by('task_date')
        task_dict = {}
        task_dict['date'] = week_date.strftime("%d %b %Y")

        day_task_list = []
        for task in day_task_qs:
            day_task_dict = {
                'task_id': task.id,
                'task_name': task.task_name
            }
            day_task_list.append(day_task_dict)

        task_dict['task_list'] = day_task_list
        task_list.append(task_dict)
    return task_list


##Function to get week dates
#Author-Ananthu
def get_week_dates(base_date, start_day, end_day=None):
    monday = base_date - timedelta(days=base_date.isoweekday() - 1)
    week_dates = [monday + timedelta(days=i) for i in range(7)]
    return week_dates[start_day - 1:end_day or start_day]