from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import Skill #Ananthu


##Table for saving User Skills.
#Author-Ananthu
class UserSkill(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    experience = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')