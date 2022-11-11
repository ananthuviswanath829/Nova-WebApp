from datetime import datetime #Ananthu

from django.contrib.auth.models import User #Ananthu
from django.db.models import Q #Ananthu
from django.core.exceptions import ValidationError #Ananthu

from app_nova.models import Friends #Ananthu
from app_nova.services import service_log #Ananthu


##Function to get users
#Author-Ananthu
def users_get(request):
    search_term = request.GET.get('search_term')
    users_qs = User.objects.filter(is_active=True, is_superuser=False).exclude(id=request.user.id)
    if search_term not in [None, '']:
        users_qs = users_qs.filter(Q(first_name__icontains=search_term)|Q(last_name__icontains=search_term))
    return users_qs


##Function to add friend
#Author-Ananthu
def add_friend(request, friend_id: int):
    try:
        user = request.user
        friend = User.objects.get(is_active=True, id=friend_id)

        if Friends.objects.filter(Q(is_active=True,user=user, friend=friend)|Q(is_active=True,user=friend, friend=user)).exists():
            err = f'Friend request already sent'
            service_log.log_save('Add Friend', err, user.username, 0)
            raise ValidationError(err)
        
        friends_obj = Friends(
            user = user,
            friend = friend,
            created_by = user,
            modified_by = user,
        )
        friends_obj.full_clean()
        friends_obj.save()
    except User.DoesNotExist:
        err = f'User does not exist, id - {friend_id}'
        service_log.log_save('Add Friend', err, user.username, 0)
        raise ValidationError(err)


##Function to get user obj for profile
#Author-Ananthu
def user_get(request):
    try:
        user_id= request.GET.get('user_id')
        return User.objects.get(is_active=True, id=user_id)
    except User.DoesNotExist:
        err = f'User does not exist, id - {user_id}'
        service_log.log_save('Person Profile Get', err, request.user.username, 0)
        raise ValidationError(err)


##Function to accept friend request
#Author-Ananthu
def friend_request_accept(request, friend_id: int):
    Friends.objects.filter(id=friend_id).update(is_accepted=True, modified_date=datetime.now(), modified_by=request.user)


##Function to accept friend request
#Author-Ananthu
def friend_request_cancel(request, friend_id: int):
    Friends.objects.filter(id=friend_id).update(is_active=False, modified_date=datetime.now(), modified_by=request.user)