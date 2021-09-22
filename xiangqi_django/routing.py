from channels.routing import ProtocolTypeRouter, URLRouter

import xiangqi_game.routing
from xiangqi_django.middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            xiangqi_game.routing.websocket_urlpatterns
        ),
    ),

})
