from django.urls import path #Ananthu
from app_nova.blockchain import blockchain #Ananthu


urlpatterns = [
    path('get_chain', blockchain.get_chain, name="get_chain"),
    path('mine_block', blockchain.mine_block, name="mine_block"),
    path('add_transaction', blockchain.add_transaction, name="add_transaction"),
    path('is_valid', blockchain.is_valid, name="is_valid"),
    path('connect_node', blockchain.connect_node, name="connect_node"),
    path('replace_chain', blockchain.replace_chain, name="replace_chain"),
]