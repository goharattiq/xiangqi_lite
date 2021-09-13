from django.urls import path
from .views import ListMyActiveGames, ListSpectateGames, AllTimeGames

urlpatterns = [
    path('active/', ListMyActiveGames.as_view()),
    path('spectate/', ListSpectateGames.as_view()),
    path('alltime/<int:pk>/', AllTimeGames.as_view()),
]