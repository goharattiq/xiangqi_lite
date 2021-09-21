from django.urls import path

from .views import RetrieveProfile, CreateProfile, SearchUser, LeaderBoard

urlpatterns = [
    path('leaderboard/', LeaderBoard.as_view(), name='get_leaderboard'),
    path('search/', SearchUser.as_view(), name='search_username'),
    path('', CreateProfile.as_view(), name='create_profile'),
    path('<str:username>/', RetrieveProfile.as_view(), name='retrieve_profile'),
]
