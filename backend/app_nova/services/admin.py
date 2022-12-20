from django.contrib.auth.models import User #Ananthu
from django.db.models.functions import Concat #Ananthu
from django.db.models import Value, Q, Count #Ananthu
from django.core.exceptions import ValidationError #Ananthu
from django.conf import settings #Ananthu

from app_nova.models import WorkPayment, Work, CryptoCredentials #Ananthu
from app_nova.services import service_log #Ananthu


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


##Function to get pending payments
#Author-Ananthu
def payment_pending_get(search_term):
    work_qs = Work.objects.exclude(status='Pending').annotate(payment_count=Count('workpayment', filter=Q(workpayment__is_active=True))).filter(is_active=True, payment_count=1).order_by('-id')
    if search_term not in (None, ''):
        work_qs = work_qs.filter(Q(name__icontains=search_term)|Q(assigned_to__first_name__icontains=search_term)|Q(assigned_to__last_name__icontains=search_term))
    return work_qs


##Function to pay user
#Author-Ananthu
def pay_user(request, work_id: int):
    try:
        user = request.user
        work_obj = Work.objects.get(is_active=True, id=work_id)
        admin_obj = User.objects.get(is_active=True, username=settings.EMAIL_HOST_USER, is_superuser=True)

        if work_obj.status != 'Completed':
            err = 'Status should be completed to pay'
            service_log.log_save('Pay User', err, request.user.username, 0)
            raise ValidationError(err)
        
        if work_obj.payment_method.name == 'Etherium':
            balance, node_address, private_key = service_log.etherium_details_get(admin_obj)
            if work_obj.amount >= balance:
                err = 'You dont have suffiecient balance'
                service_log.log_save('Pay User', err, user.username, 0)
                raise ValidationError(err)
            
            recipient = CryptoCredentials.objects.get(user=work_obj.assigned_to)
            txn_id = service_log.send_etherium(node_address, private_key, recipient.node_address, work_obj.amount)
                
        service_log.work_payment_create(work_obj, txn_id, work_obj.payment_method, admin_obj, work_obj.assigned_to, work_obj.amount, 'Paid to user - Manual', user)
        msg = f'Payment success, Transaction id - {txn_id}'
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Pay User', err, request.user.username, 0)
        raise ValidationError(err)