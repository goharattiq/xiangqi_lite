from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import game.routing


# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             game.routing.websocket_urlpatterns
#         )
#     ),
# })
from xiangqi_django.middleware import JsonTokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": JsonTokenAuthMiddlewareStack(
        URLRouter(
            game.routing.websocket_urlpatterns
        ),
    ),

})