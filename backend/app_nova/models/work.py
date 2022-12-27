from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import PaymentMethod #Ananthu


##Table for saving Work.
#Author-Ananthu
class Work(models.Model):
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    name = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.TextField()
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=4)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    is_success = models.BooleanField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')