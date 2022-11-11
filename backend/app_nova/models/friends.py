from django.db import models
from django.contrib.auth.models import User


##Table for saving Friends.
#Author-Ananthu
class Friends(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name="+")
    is_accepted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="+")
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="+")