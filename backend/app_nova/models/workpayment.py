from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import Work, PaymentMethod #Ananthu


##Table to save work payment
#Author-Ananthu
class WorkPayment(models.Model):
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    transaction_id = models.TextField()
    paid_from = models.ForeignKey(User, on_delete=models.CASCADE)
    paid_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    status = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=4)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')