from django.urls import path
from .views import RetrieveProfile, CreateProfile, SearchUser

urlpatterns = [
    path('', CreateProfile.as_view()),
    path('<pk>/', RetrieveProfile.as_view()),
    path('search/<username>/', SearchUser.as_view()),
]
