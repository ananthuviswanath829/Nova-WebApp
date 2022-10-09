"""
WSGI config for project_nova project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import dotenv #Ananthu

from pathlib import Path #Ananthu
from django.core.wsgi import get_wsgi_application


DOT_ENV_PATH = Path(__file__).resolve().parent.parent / '.env'
if DOT_ENV_PATH.exists():
    dotenv.read_dotenv(str(DOT_ENV_PATH))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_nova.settings')

application = get_wsgi_application()
