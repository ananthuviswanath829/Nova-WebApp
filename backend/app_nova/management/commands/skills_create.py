from django.core.management.base import BaseCommand #Ananthu
from django.contrib.auth.models import User #Ananthu

from app_nova.models import Skill #Ananthu

##Command to create admin
#Author-Ananthu
class Command(BaseCommand):
    help = 'Create admin'

    def handle(self, *args, **options):
        skill_list = ['Java', 'Python', 'JavaScript', 'CSS3', 'Html5']
        user_obj = User.objects.filter(is_superuser=True)[0]
        
        for skill in skill_list:
            skill_obj = Skill(
                name = skill,
                created_by = user_obj,
                modified_by = user_obj,
            )
            skill_obj.full_clean()
            skill_obj.save()

        self.stdout.write(self.style.SUCCESS('Skills created successfully'))