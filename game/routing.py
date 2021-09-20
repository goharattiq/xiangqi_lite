from django.conf.urls import url

from .consumers import app

websocket_urlpatterns = [
    url(r'^socket.io/', app),
]