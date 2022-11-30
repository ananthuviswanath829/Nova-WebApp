from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu


##Table for saving Work.
#Author-Ananthu
class Work(models.Model):
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.TextField()
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')