from django.db import models #Ananthu
from django.contrib.auth.models import User #Ananthu


##Table for saving user crypto credentials.
#Author-Ananthu
class CryptoCredentials(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    eth_node_address = models.TextField(null=True, blank=True)
    eth_private_key = models.TextField(null=True, blank=True)
    super_coin_node_address = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)