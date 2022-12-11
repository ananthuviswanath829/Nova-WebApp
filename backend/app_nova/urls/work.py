from django.urls import path #Ananthu
from app_nova.views import work #Ananthu


urlpatterns = [
    path('list/get', work.WorkListGetAPI.as_view()),
    path('create', work.WorkCreateAPI.as_view()),
    path('details/get', work.WorkDetailsGetAPI.as_view()),
    path('edit', work.WorkEditAPI.as_view()),
    path('delete/<int:work_id>', work.WorkDeleteAPI.as_view()),

    path('comment/save', work.WorkCommentSaveAPI.as_view()),
    path('comments/get', work.WorkCommentListGetAPI.as_view()),

    path('status/get', work.EtheriumStatusGetAPI.as_view()),
    path('transaction', work.EtheriumTransactionAPI.as_view()),
]