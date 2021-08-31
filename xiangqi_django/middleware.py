import jwt
from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser, User
from channels.db import database_sync_to_async
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
        access_token = scope['query_string'].decode().split('access_token=')[1].split('&')[0]
        scope['user'] = AnonymousUser() if access_token is None else await get_user(access_token)
        return await self.app(scope, receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
