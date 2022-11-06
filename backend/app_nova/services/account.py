import json #Ananthu
import base64 #Ananthu
import random #Ananthu
import string #Ananthu

from PIL import Image as pil_img
from io import BytesIO #Ananthu

from datetime import datetime #Ananthu

from django.core.exceptions import ValidationError #Ananthu
from django.contrib.auth.models import User #Ananthu
from django.core.mail import EmailMessage #Ananthu
from django.conf import settings #Ananthu
from django.db import transaction #Ananthu

from app_nova.services import service_log #Ananthu
from app_nova.models import UserProfile, EmailVerificationCode, Skill, UserSkill #Ananthu


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
    
    characters = string.ascii_letters + string.digits
    token = ''.join(random.choice(characters) for i in range(20))

    with transaction.atomic():
        user_obj = User(
            first_name = first_name,
            last_name = last_name,
            email = email,
            username = email,
        )
        user_obj.set_password(password)
        user_obj.full_clean()
        user_obj.save()

        userprofile_obj = UserProfile(
            user = user_obj,
        )
        userprofile_obj.full_clean()
        userprofile_obj.save()

        email_code_obj = EmailVerificationCode(
            user = user_obj,
            code_text = token,
        )
        email_code_obj.full_clean()
        email_code_obj.save()
    
    subject = 'Nova Account Verification'
    content = f'Hi {first_name}, \n\n'
    content += 'Thank you for registering with us. \n'
    content += f'Your email verification link - {settings.EMAIL_URL}/account/verification/{token} \n\n'
    content += 'Regards, \n'
    content += 'Team Nova'
    from_email = settings.EMAIL_HOST_USER
    email = EmailMessage(subject, content, from_email, to=[email])
    email.send()


##Function to verify token
#Author-Ananthu
def verify_token(token):
    try:
        email_verification_obj = EmailVerificationCode.objects.get(is_active=True, code_text=token)

        with transaction.atomic():
            UserProfile.objects.filter(is_active=True, user=email_verification_obj.user).update(is_verified=True)
            email_verification_obj.is_active = False
            email_verification_obj.save()
    except EmailVerificationCode.DoesNotExist:
        err = 'Invalid Token'
        service_log.log_save('Email Verification', err, 'Anonymous', 0)
        raise ValidationError(err)


##Function to edit user profile
#Author-Ananthu
def user_profile_Edit(request, first_name: str, last_name: str, email: str, dob: datetime, profile_pic: str, skills_list: str):
    try:
        skills_list = json.loads(skills_list)
        
        user = request.user
        userprofile_obj = UserProfile.objects.get(is_active=True, user=user)
        all_skills_qs = Skill.objects.filter(is_active=True)

        with transaction.atomic():
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.save()

            userprofile_obj.dob = dob
            userprofile_obj.save()

            for skill in skills_list:
                skill_obj = all_skills_qs.get(name=skill['skill'])

                user_skill_obj = UserSkill(
                    user = user,
                    skill = skill_obj,
                    experience = int(skill['experience']),
                    created_by = user,
                    modified_by = user,
                )
                user_skill_obj.full_clean()
                user_skill_obj.save()
    except UserProfile.DoesNotExist:
        err = f'Skill does not exist - {skill}'
        service_log.log_save('Profile Edit', err, user.username, 0)
        raise ValidationError(err)
    except UserProfile.DoesNotExist:
        err = 'Userprofile does not exist'
        service_log.log_save('Profile Edit', err, user.username, 0)
        raise ValidationError(err)