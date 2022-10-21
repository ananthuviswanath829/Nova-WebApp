from django.db import models #Ananthu


## Table for saving log.
#Author-Ananthu
class Log(models.Model):
    log_uid = models.TextField()
    action = models.TextField()
    action_details = models.TextField()
    action_by_user = models.TextField()
    log_type = models.TextField()
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)