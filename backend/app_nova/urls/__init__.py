from django.urls import path, include #Ananthu


urlpatterns = [
    path('user/', include('app_nova.urls.account')),
    path('', include('app_nova.urls.search')),
]