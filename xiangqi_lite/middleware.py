import jwt
from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser, User

from .settings import SECRET_KEY, SIMPLE_JWT


@database_sync_to_async
def get_user(access_token):
    try:
        user_id = jwt.decode(access_token, SECRET_KEY, algorithms=[SIMPLE_JWT['ALGORITHM']]).get(
            SIMPLE_JWT['USER_ID_CLAIM'])
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        query_string = scope['query_string'].decode()
        _, access_token = query_string.split('access_token=')
        access_token, *_ = access_token.split('&')
        scope['user'] = AnonymousUser() if access_token is None else await get_user(access_token)
        return await self.app(scope, receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
