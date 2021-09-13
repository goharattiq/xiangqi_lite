from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from game.models import Game
from game.serializers import ListGameSerializer
from django.db.models import Q


class ListMyActiveGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        return Game.objects.filter(
            Q(player_1__user_id=self.request.user.pk) |
            Q(player_2__user_id=self.request.user.pk),
            is_active=True)


class ListSpectateGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        return Game.objects.filter(
            ~Q(player_1__user_id=self.request.user.pk),
            ~Q(player_2__user_id=self.request.user.pk),
            is_active=True,
            is_public=True
        )


class AllTimeGames(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListGameSerializer

    def get_queryset(self):
        return Game.objects.filter(
            Q(player_1__user_id=self.request.user.pk) |
            Q(player_2__user_id=self.request.user.pk),
            is_active=False,
        )