from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from game.models import Game
from game.serializers import ListGameSerializer


class ListMyActiveGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        return Game.objects.filter(
            Q(player_1__profile__user_id=self.request.user.pk) |
            Q(player_2__profile__user_id=self.request.user.pk)|
            Q(player_1=None) |
            Q(player_2=None),
            is_active=True)


class ListSpectateGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        return Game.objects.filter(
            ~Q(player_1__profile__user_id=self.request.user.pk),
            ~Q(player_2__profile__user_id=self.request.user.pk),
            ~Q(player_1=None),
            ~Q(player_2=None),
            is_active=True,
            is_public=True
        )


class AllTimeGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        username = self.kwargs.get('username')
        qs = Game.objects.filter(
            Q(player_1__profile__user__username=username) |
            Q(player_2__profile__user__username=username),
            is_active=False
        )

        if username == self.request.user.username:
            return qs
        else:
            return qs.filter(is_public=True)
