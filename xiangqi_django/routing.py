from channels.routing import ProtocolTypeRouter, URLRouter
import game.routing

from xiangqi_django.middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            game.routing.websocket_urlpatterns
        ),
    ),

})
