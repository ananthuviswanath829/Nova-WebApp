from django.core.exceptions import ValidationError #Ananthu
from django.contrib.auth.models import User #Ananthu

from app_nova.services import service_log #Ananthu


##Function to register
#Author-Ananthu
def user_register(request, first_name: str, last_name: str, email: str, password: str):
    
    users = User.objects.filter(is_active=True)

    if users.filter(email=email).exists():
        err = 'E-mail already exists'
        service_log.log_save('User Login', err, 'Anonymous', 0)
        raise ValidationError(err)
    
    if users.filter(username=email).exists():
        err = 'Username already exists'
        service_log.log_save('User Login', err, 'Anonymous', 0)
        raise ValidationError(err)

    user_obj = User(
        first_name = first_name,
        last_name = last_name,
        email = email,
        username = email,
    )
    user_obj.set_password(password)
    user_obj.full_clean()
    user_obj.save()