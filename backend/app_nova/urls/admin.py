from django.urls import path #Ananthu
from app_nova.views import admin #Ananthu


urlpatterns = [
    path('user/list/get', admin.UserListGetAPI.as_view()),
    path('user/toggle/<int:user_id>', admin.ToggleUserAPI.as_view()),

    path('transaction/list/get', admin.TransactionListGetAPI.as_view()),

    path('payment/pending/list/get', admin.PaymentPendingListGetAPI.as_view()),
    path('pay/user', admin.PayUserAPI.as_view()),
]