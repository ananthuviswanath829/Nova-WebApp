from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu


##Table for saving Email verification code.
#Author-Ananthu
class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)