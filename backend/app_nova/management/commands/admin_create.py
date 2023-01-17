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

            super_coin_node_address='e36f0158f0aed45b3bc755dc52ed4560d'
            eth_node_address = '0x61D99D0746aD91581BB833c45264ea68F012C819'
            eth_private_key = 'cc25f0a47857a0bf900ebfe478f0c55118e314543242aa9dad4cdaffbb564bc6'
            crypto_obj = CryptoCredentials(
                user = user_obj,
                eth_node_address = eth_node_address,
                eth_private_key = eth_private_key,
                super_coin_node_address = super_coin_node_address,
            )
            crypto_obj.full_clean()
            crypto_obj.save()

            CryptoCredentials.objects.filter(user=user_obj).update(super_coin_node_address=super_coin_node_address)
            self.stdout.write(self.style.SUCCESS('Admin created successfully'))