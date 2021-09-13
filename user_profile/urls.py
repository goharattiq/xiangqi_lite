from django.urls import path
from .views import RetrieveProfile, CreateProfile, SearchUser, LeaderBoard

urlpatterns = [
    path('leaderboard/', LeaderBoard.as_view()),
    path('search/<username>/', SearchUser.as_view()),
    path('', CreateProfile.as_view()),
    path('<str:pk>/', RetrieveProfile.as_view()),
]
