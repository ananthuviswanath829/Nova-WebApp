from django.urls import path, include #Ananthu


urlpatterns = [
    path('user/', include('app_nova.urls.account')),
    path('task/', include('app_nova.urls.task')),
    path('work/', include('app_nova.urls.work')),
    path('etherium/', include('app_nova.urls.work')),
    path('', include('app_nova.urls.usermngmnt')),
    path('admin/', include('app_nova.urls.admin')),
]