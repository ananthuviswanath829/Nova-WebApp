from django.urls import path, include #Ananthu


urlpatterns = [
    path('user/', include('app_nova.urls.account')),
    path('task/', include('app_nova.urls.task')),
    path('', include('app_nova.urls.usermngmnt')),
]