from datetime import date, datetime #Ananthu
from decimal import Decimal #Ananthu

from django.conf import settings #Ananthu
from django.db.models import Q #Ananthu 
from django.contrib.auth.models import User #Ananthu
from django.core.exceptions import ValidationError #Ananthu
from django.db import transaction #Ananthu

from app_nova.models import Work, WorkComment, CryptoCredentials, PaymentMethod #Ananthu
from app_nova.services import service_log #Ananthu


##Function to get work list
#Author-Ananthu
def works_get(request):
    works_qs = Work.objects.filter(Q(is_active=True, created_by=request.user)|Q(is_active=True, assigned_to=request.user))
    return works_qs


##Function to create work
#Author-Ananthu
def work_create(request, work_name: str, start_date: date, end_date: date, status: str, 
                    user_id: int, description: str, payment_method: str, amount: str):
    try:
        user = request.user
        assigned_to = User.objects.get(is_active=True, id=user_id)
        payment_method_obj = PaymentMethod.objects.get(is_active=True, name=payment_method)

        work_obj = Work(
            assigned_to = assigned_to,
            payment_method = payment_method_obj,
            name = work_name,
            start_date = start_date,
            end_date = end_date,
            status = status,
            description = description,
            amount = amount,
            created_by = user,
            modified_by = user,
        )
        work_obj.full_clean()
        work_obj.save()
    except User.DoesNotExist:
        err = f'User does not exist, id - {user_id}'
        service_log.log_save('Work Create', err, user.username, 0)
        raise ValidationError(err)
    except PaymentMethod.DoesNotExist:
        err = f'Payment method does not exist - {payment_method}'
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
def work_edit(request, work_id: int, work_name: str, start_date: date, end_date: date, status: str, 
                user_id: int, description: str, payment_method: str, amount: Decimal, rating: Decimal):
    try:
        user = request.user
        assigned_to = User.objects.get(is_active=True, id=user_id)
        payment_method_obj = PaymentMethod.objects.get(is_active=True, name=payment_method)
        work_obj = Work.objects.get(is_active=True, id=work_id)
        admin_obj = User.objects.get(is_active=True, username=settings.EMAIL_HOST_USER, is_superuser=True)
        msg = 'Work edited successfully'

        with transaction.atomic():
            if status == 'Assigned':
                if user.id != work_obj.created_by.id:
                    err = 'You dont have no permission to update status to assigned'
                    service_log.log_save('Work Edit', err, user.username, 0)
                    raise ValidationError(err)

                if payment_method == 'Etherium':
                    balance, node_address, private_key = service_log.etherium_details_get(work_obj.created_by)
                    if amount >= balance:
                        err = 'You dont have suffiecient balance'
                        service_log.log_save('Work Edit', err, user.username, 0)
                        raise ValidationError(err)
                    
                    recipient = CryptoCredentials.objects.get(user=admin_obj)
                    txn_id = service_log.send_etherium(node_address, private_key, recipient.node_address, amount)
                
                service_log.work_payment_create(work_obj, txn_id, payment_method_obj, work_obj.created_by, admin_obj, amount, 'Paid to admin', user)
                msg = f'Payment success, Transaction id - {txn_id}'

            if status == 'Completed':
                if user.id != work_obj.created_by.id:
                    err = 'You dont have no permission to update status to completed'
                    service_log.log_save('Work Edit', err, user.username, 0)
                    raise ValidationError(err)

                work_obj.rating = rating
                msg = 'Work edited successfully. Admin will manually process the payment.'
                
                if rating >= 3:
                    if payment_method == 'Etherium':
                        balance, node_address, private_key = service_log.etherium_details_get(admin_obj)
                        if amount >= balance:
                            err = 'Admin doesnt have suffiecient balance. Please contact our support team'
                            service_log.log_save('Work Edit', err, admin_obj.username, 0)
                            raise ValidationError(err)
                        
                        recipient = CryptoCredentials.objects.get(user=work_obj.assigned_to)
                        txn_id = service_log.send_etherium(node_address, private_key, recipient.node_address, work_obj.amount)

                    service_log.work_payment_create(work_obj, txn_id, payment_method_obj, admin_obj, work_obj.assigned_to, amount, 'Paid to user', user)
                    msg = f'Payment success, Transaction id - {txn_id}'

            work_obj.assigned_to = assigned_to
            work_obj.payment_method = payment_method_obj
            work_obj.name = work_name
            work_obj.start_date = start_date
            work_obj.end_date = end_date
            work_obj.status = status
            work_obj.description = description
            work_obj.amount = amount
            work_obj.modified_by = user
            work_obj.modified_date = datetime.now()
            work_obj.full_clean()
            work_obj.save()

        return msg
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)
    except User.DoesNotExist:
        err = f'User does not exist, id - {user_id}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)
    except PaymentMethod.DoesNotExist:
        err = f'Payment method does not exist - {payment_method}'
        service_log.log_save('Work Edit', err, user.username, 0)
        raise ValidationError(err)
    except CryptoCredentials.DoesNotExist:
        err = f'Crypto Credentials method does not exist, email - {settings.EMAIL_HOST_USER}'
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


##Function to save work comment
#Author-Ananthu
def comment_save(request, work_id: int, comment: str):
    try:
        user = request.user
        work_obj = Work.objects.get(is_active=True, id=work_id)

        comment_obj = WorkComment(
            work = work_obj,
            user = user,
            status = work_obj.status,
            comment = comment,
            created_by = user,
            modified_by = user,
        )
        comment_obj.full_clean()
        comment_obj.save()
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Work Comment Save', err, user.username, 0)
        raise ValidationError(err)


##Function to get work comments
#Author-Ananthu
def comments_get(request):
    try:
        work_id = request.GET.get('work_id')
        work_obj = Work.objects.get(id=work_id)
        return WorkComment.objects.filter(is_active=True, work=work_obj, status=work_obj.status).order_by('-id')
    except Work.DoesNotExist:
        err = f'Work does not exist, id - {work_id}'
        service_log.log_save('Work Comment Save', err, request.user.username, 0)
        raise ValidationError(err)


##Function to get etherium status
#Author-Ananthu
def etherium_status_get(request):
    try:
        user = request.user
        balance, node_address, private_key = service_log.etherium_details_get(user)
        return {'node_address': node_address, 'balance': balance}
    except CryptoCredentials.DoesNotExist:
        err = f'Crypto Credentials does not exist, user id - {user.id}'
        service_log.log_save('Etherium status get', err, user.username, 0)
        raise ValidationError(err)


##Function to transfer etherium
#Author-Ananthu
def transfer_etherium(request, recipient: str, amount: float):
    try:
        user = request.user

        balance, node_address, private_key = service_log.etherium_details_get(user)
    
        if amount >= balance:
            err = "You don't have sufficient balance"
            service_log.log_save('Etherium Transfer', err, user.username, 0)
            raise ValidationError(err)

        txn_id = service_log.send_etherium(node_address, private_key, recipient, amount)
        
        return f'Payment success, Transaction id - {txn_id}'
    except CryptoCredentials.DoesNotExist:
        err = f'Crypto Credentials does not exist, user id - {user.id}'
        service_log.log_save('Etherium Transfer', err, user.username, 0)
        raise ValidationError(err)