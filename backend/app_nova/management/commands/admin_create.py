from django.core.management.base import BaseCommand #Ananthu
from django.db import transaction #Ananthu
from django.contrib.auth.models import User #Ananthu
from app_nova.models import CryptoCredentials, UserProfile #Ananthu

##Command to create admin
#Author-Ananthu
class Command(BaseCommand):
    help = 'Create admin'

    def handle(self, *args, **options):
        with transaction.atomic():
            User.objects.create_superuser(username="app.connect.nova@gmail.com", email='app.connect.nova@gmail.com', password='NovaAdmin#123*',first_name="Nova",last_name="Admin")

            user_obj = User.objects.get(username="app.connect.nova@gmail.com")

            userprofile_obj = UserProfile(
                user = user_obj,
                is_verified = True,
            )
            userprofile_obj.full_clean()
            userprofile_obj.save()

            node_address = '0x57B585e8236eA1283f99eCdD6709485Dd39F4654'
            private_key = '987efb9ac26719d0b71d4f3b4042d450b99d895608b052554b10f5a34028679d'
            crypto_obj = CryptoCredentials(
                user = user_obj,
                node_address = node_address,
                private_key = private_key,
            )
            crypto_obj.full_clean()
            crypto_obj.save()
            self.stdout.write(self.style.SUCCESS('Admin created successfully'))