from channels.routing import ProtocolTypeRouter, URLRouter

import apps.game.routing
from xiangqi_lite.middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            apps.game.routing.websocket_urlpatterns
        ),
    ),

})
