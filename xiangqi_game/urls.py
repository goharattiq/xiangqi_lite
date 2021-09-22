from django.urls import path

from .views import ListMyActiveGames, ListSpectateGames, AllTimeGames

urlpatterns = [
    path('active/', ListMyActiveGames.as_view(), name='active'),
    path('spectate/', ListSpectateGames.as_view(), name='spectate'),
    path('alltime/<str:username>/', AllTimeGames.as_view(), name='alltime'),
]
