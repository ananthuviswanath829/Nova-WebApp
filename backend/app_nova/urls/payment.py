from django.urls import path #Ananthu
from app_nova.views import payment #Ananthu


urlpatterns = [
    path('get_chain', payment.get_chain, name="get_chain"),
    path('mine_block', payment.mine_block, name="mine_block"),
    path('add_transaction', payment.add_transaction, name="add_transaction"),
    path('is_valid', payment.is_valid, name="is_valid"),
    path('connect_node', payment.connect_node, name="connect_node"),
    path('replace_chain', payment.replace_chain, name="replace_chain"),
]