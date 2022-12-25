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

            node_address = '0x61D99D0746aD91581BB833c45264ea68F012C819'
            private_key = 'cc25f0a47857a0bf900ebfe478f0c55118e314543242aa9dad4cdaffbb564bc6'
            crypto_obj = CryptoCredentials(
                user = user_obj,
                node_address = node_address,
                private_key = private_key,
            )
            crypto_obj.full_clean()
            crypto_obj.save()
            self.stdout.write(self.style.SUCCESS('Admin created successfully'))