from django.core.management.base import BaseCommand #Ananthu
from django.contrib.auth.models import User #Ananthu


##Command to create admin
#Author-Ananthu
class Command(BaseCommand):
    help = 'Create admin'

    def handle(self, *args, **options):
        User.objects.create_superuser(username="app.connect.nova@gmail.com", email='app.connect.nova@gmail.com', password='NovaAdmin#123*',first_name="Nova",last_name="Admin")

        self.stdout.write(self.style.SUCCESS('Admin created successfully'))