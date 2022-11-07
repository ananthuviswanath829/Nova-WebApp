from django.contrib.auth.models import User #Ananthu
from django.db.models import Q #Ananthu


##Function to get users
#Author-Ananthu
def users_get(request):
    search_term = request.GET.get('search_term')
    users_qs = User.objects.filter(is_active=True, is_superuser=False).exclude(id=request.user.id)
    if search_term not in [None, '']:
        users_qs = users_qs.filter(Q(first_name__icontains=search_term)|Q(last_name__icontains=search_term))
    return users_qs