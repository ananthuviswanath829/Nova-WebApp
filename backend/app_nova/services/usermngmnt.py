from datetime import datetime #Ananthu

from django.contrib.auth.models import User #Ananthu
from django.db.models import Q #Ananthu
from django.core.exceptions import ValidationError #Ananthu
from django.contrib.postgres.search import SearchVector, SearchQuery #Ananthu
from django.db.models.functions import Concat #Ananthu

from app_nova.models import Friends, UserSkill, UserProfile #Ananthu
from app_nova.services import service_log #Ananthu
from app_nova.recommendation.fuzzy_controller import UserController #Ananthu

##Function to get users
#Author-Ananthu
def users_get(request):
    try:
        user = request.user
        search_term = request.GET.get('search_term')
        all_users_qs = User.objects.filter(is_active=True, is_superuser=False).exclude(id=request.user.id)
        user_profile_obj = user.userprofile_set.get(is_active=True)

        user_skill_qs = UserSkill.objects.select_related('user', 'skill').filter(user__is_active=True, user__is_superuser=False).exclude(user=request.user)
        user_id_list, skill_id_list = [], []
        if search_term not in [None, '']:
            users_qs = all_users_qs.annotate(full_name=Concat('first_name', 'last_name')).filter(Q(full_name__icontains=search_term)|Q(email__icontains=search_term))
            user_id_list = list(users_qs.values_list('id', flat=True).distinct())
            skill_vector = SearchVector('skill__name')
            skill_query = SearchQuery(search_term)
            user_skill_qs = user_skill_qs.annotate(search=skill_vector).filter(search=skill_query)
            skill_id_list = list(user_skill_qs.values_list('user__id', flat=True).distinct())
            user_controller_obj = UserController(extract_user_data(skill_id_list, search_term))
            user_controller_obj.create_sim_instance(request.user.username)
            user_controller_obj.calculate(user_profile_obj.rating, user_profile_obj.per_hour_rate)
            result = user_controller_obj.results()
        id_list = list(set(skill_id_list + user_id_list))
        return all_users_qs.filter(id__in=id_list)
    except UserProfile.DoesNotExist:
        err = f'profile does not exist for user, id - {user.id}'
        service_log.log_save('User Search', err, user.username, 0)
        raise ValidationError(err)


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


##Function to extract user data
#Author-Ananthu
def extract_user_data(user_id_list, skill):
    try:
        users_qs = User.objects.filter(is_active=True, is_superuser=False, id__in=user_id_list)
        data_list = []

        for user in users_qs:
            skill_obj = user.userskill_set.get(is_active=True, skill__name__iexact=skill)
            profile_obj = user.userprofile_set.get(is_active=True)
            data_dict = {
                'user_id': user.id,
                'skill': skill_obj.skill.name,
                'experience': skill_obj.experience,
                'rating': profile_obj.rating,
                'per_hour_rate': profile_obj.per_hour_rate,
                'availability': 10,
            }
            data_list.append(data_dict)
        
        return data_list
    except UserSkill.DoesNotExist:
        err = f'User does not exist, id - {user.id}'
        service_log.log_save('Extract user data', err, user.username, 0)
        raise ValidationError(err)
    except UserProfile.DoesNotExist:
        err = f'User does not exist, id - {user.id}'
        service_log.log_save('Extract user data', err, user.username, 0)
        raise ValidationError(err)