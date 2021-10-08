import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'xiangqi_lite.settings')

application = get_wsgi_application()
