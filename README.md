# Nova-WebApp

Create virtual environment and install all the dependancies to it

Command to create virtual environment
virtualenv -p python3 venv

Command to install all packages
pip install -r requirements.txt

create a .env file with values,
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=
DB_ENGINE=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
EMAIL_URL=
EMAIL_USE_TLS=
EMAIL_HOST=
EMAIL_HOST_USER=
EMAIL_PASSWORD=
EMAIL_HOST_PASSWORD=
EMAIL_PORT=
ETHERIUM_URL=

In order to pay using Ethereum in test environement, please install Ganache on your system and make sure it is running when you perform Ethereum related tasks.
download link - https://trufflesuite.com/ganache/

Command to build react app - 
npm run build

command to create or modify tables
python manage.py makemigrations and python manage.py migrate

Command to run server
python manage.py runserver
