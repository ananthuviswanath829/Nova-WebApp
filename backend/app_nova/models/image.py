from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu


##Table for saving Email verification code.
#Author-Ananthu
class Image(models.Model):
    path = models.ImageField(upload_to="images")
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')