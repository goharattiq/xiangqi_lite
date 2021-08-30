from django.urls import path
from .views import ListMyActiveGames, ListSpectateGames

urlpatterns = [
    path('my_game/', ListMyActiveGames.as_view()),
    path('spectate/', ListSpectateGames.as_view()),
]