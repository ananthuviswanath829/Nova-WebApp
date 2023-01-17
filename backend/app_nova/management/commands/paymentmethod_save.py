from django.core.management.base import BaseCommand #Ananthu
from django.contrib.auth.models import User #Ananthu

from app_nova.models import PaymentMethod #Ananthu

##Command to create admin
#Author-Ananthu
class Command(BaseCommand):
    help = 'Create Payment Method'

    def handle(self, *args, **options):
        method_list = ['Ethereum', 'SuperCoin']
        user_obj = User.objects.filter(is_superuser=True)[0]
        
        for skill in method_list:
            payment_method_obj = PaymentMethod(
                name = skill,
                created_by = user_obj,
                modified_by = user_obj,
            )
            payment_method_obj.full_clean()
            payment_method_obj.save()

        self.stdout.write(self.style.SUCCESS('Payement methods created successfully'))