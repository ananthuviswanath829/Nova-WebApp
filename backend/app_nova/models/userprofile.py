from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import Image #Ananthu

##Table for saving Email verification code.
#Author-Ananthu
class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_pic = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    per_hour_rate = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    rating = models.DecimalField(default=0, max_digits=2, decimal_places=1)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)