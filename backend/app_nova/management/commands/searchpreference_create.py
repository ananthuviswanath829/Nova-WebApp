from django.core.management.base import BaseCommand #Ananthu
from django.contrib.auth.models import User #Ananthu

from app_nova.models import SearchPreference #Ananthu

##Command to create admin
#Author-Ananthu
class Command(BaseCommand):
    help = 'Create Search Preference'

    def handle(self, *args, **options):
        users_qs = User.objects.filter(is_superuser=False)
        experience = 'Junior'
        per_hour_cost = 'Low'
        availability = 'Medium'
        rating = 'Good'
        for user in users_qs:
            preference_obj = SearchPreference(
                user = user,
                experience = experience,
                per_hour_cost = per_hour_cost,
                availability = availability,
                rating = rating,
                created_by = user,
                modified_by = user,
            )
            preference_obj.full_clean()
            preference_obj.save()
        self.stdout.write(self.style.SUCCESS('Preferences updated successfully'))