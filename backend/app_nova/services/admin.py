from django.contrib.auth.models import User #Ananthu
from django.db.models.functions import Concat #Ananthu
from django.db.models import Value, Q #Ananthu


##Function to get users
#Author-Ananthu
def users_get(search_term):
    user_qs = User.objects.annotate(full_name=Concat('first_name', Value(' '), 'last_name')).filter(is_superuser=False).order_by('-id')
    if search_term not in (None, ''):
        user_qs = user_qs.filter(Q(full_name__icontains=search_term)|Q(email__icontains=search_term))
    return user_qs