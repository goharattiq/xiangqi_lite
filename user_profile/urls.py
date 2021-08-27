from django.urls import path
from .views import RetrieveProfile, CreateProfile

urlpatterns = [
    path('', CreateProfile.as_view()),
    path('<pk>/', RetrieveProfile.as_view()),
]
