from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import PaymentMethod #Ananthu


##Table for saving user profile.
#Author-Ananthu
class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_pic = models.TextField(null=True, blank=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, null=True, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    per_hour_rate = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    rating = models.DecimalField(default=0, max_digits=2, decimal_places=1)
    super_coins = models.DecimalField(default=0, max_digits=10, decimal_places=4)
    success_rate = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)