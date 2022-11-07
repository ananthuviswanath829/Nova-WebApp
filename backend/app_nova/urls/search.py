from django.urls import path #Ananthu
from app_nova.views import search #Ananthu


urlpatterns = [
    path('search/result/get', search.SearchResultGetAPI.as_view()),
]