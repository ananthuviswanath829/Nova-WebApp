from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu


##Table for saving User Skills.
#Author-Ananthu
class UserTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_name = models.TextField()
    hours = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')