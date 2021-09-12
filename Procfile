release: python manage.py migrate
web: daphne xiangqi_django.asgi:application --port $PORT --bind 0.0.0.0
worker: python manage.py runserver
