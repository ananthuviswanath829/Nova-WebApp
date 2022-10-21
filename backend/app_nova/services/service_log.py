from datetime import datetime #Ananthu
from app_nova.models import Log #Ananthu


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