from django.contrib.auth.models import User #Ananthu
from django.db.models.functions import Concat #Ananthu
from django.db.models import Value, Q #Ananthu

from app_nova.models import WorkPayment #Ananthu


##Function to get users
#Author-Ananthu
def users_get(search_term):
    user_qs = User.objects.annotate(full_name=Concat('first_name', Value(' '), 'last_name')).filter(is_superuser=False).order_by('-id')
    if search_term not in (None, ''):
        user_qs = user_qs.filter(Q(full_name__icontains=search_term)|Q(email__icontains=search_term))
    return user_qs


##Function to get transactions
#Author-Ananthu
def transactions_get(search_term):
    work_payment_qs = WorkPayment.objects.select_related('work').filter(is_active=True).order_by('-id')
    if search_term not in (None, ''):
        work_payment_qs = work_payment_qs.filter(Q(work__name__icontains=search_term)|Q(transaction_id__icontains=search_term))
    return work_payment_qs