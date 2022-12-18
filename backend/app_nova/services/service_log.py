from datetime import datetime #Ananthu
from web3 import Web3 #Ananthu
from django.conf import settings #Ananthu
from app_nova.models import Log, WorkPayment, CryptoCredentials #Ananthu


## Function to save Logs
#Author-Ananthu
def log_save(action, action_details, username, log_type):
    logcount = Log.objects.all().count()
    logcount = str(logcount + 1)
    seconds = datetime.now().strftime('%S')
    log_uid = 'LOG' +str(seconds) +logcount.zfill(5)
    while Log.objects.filter(log_uid=log_uid).exists():
        logcount = Log.objects.all().count()
        logcount = str(logcount + 1)
        seconds = datetime.now().strftime('%S')
        log_uid = 'LOG' +str(seconds) +logcount.zfill(5)
    
    e_log = Log(
        action = action,
        action_details = action_details,
        action_by_user = username,
        log_uid=log_uid,
        log_type = log_type
    )
    e_log.save()


##Function to send etherium
#Author-Ananthu
def send_etherium(node_address, private_key, recipient, amount):
    web3 = Web3(Web3.HTTPProvider(settings.ETHERIUM_URL))
    nonce = web3.eth.getTransactionCount(node_address)
    tx = {
        'nonce': nonce,
        'to': recipient,
        'value': web3.toWei(amount, 'ether'),
        'gas': 2000000,
        'gasPrice': web3.toWei('50', 'gwei'),
    }
    signed_tx = web3.eth.account.signTransaction(tx, private_key)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return web3.toHex(tx_hash)


##Function to create work payment
#Author-Ananthu
def work_payment_create(work_obj, txn_id, payment_method_obj, paid_from, paid_to, amount, status, user):
    work_payment_obj = WorkPayment(
        work = work_obj,
        transaction_id = txn_id,
        payment_method = payment_method_obj,
        paid_from = paid_from,
        paid_to = paid_to,
        amount = amount,
        status = status,
        created_by = user,
        modified_by = user,
    )
    work_payment_obj.full_clean()
    work_payment_obj.save()


##Function to get etherium balance
#Author-Ananthu
def etherium_details_get(user):
    crypto_credentials_obj = CryptoCredentials.objects.get(is_active=True, user=user)
    node_address = crypto_credentials_obj.node_address
    private_key = crypto_credentials_obj.private_key
    web3 = Web3(Web3.HTTPProvider(settings.ETHERIUM_URL))
    balance = web3.eth.getBalance(node_address)
    balance = web3.fromWei(balance, 'ether')
    return balance, node_address, private_key