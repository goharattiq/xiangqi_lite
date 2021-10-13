from channels.routing import ProtocolTypeRouter, URLRouter

import xiangqi_lite.apps.game.routing
from xiangqi_lite.middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            xiangqi_lite.apps.game.routing.websocket_urlpatterns
        ),
    ),

})
