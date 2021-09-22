from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class TestSetUp(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user1 = User.objects.create_user(username='test1', email='test1@gmail.com', password='admin1')

        cls.active_game_url = reverse('active')
        cls.spectate_game_url = reverse('spectate')
        cls.alltime_game_session_user_url = reverse('alltime', kwargs={'username': user1.username})
        cls.alltime_game_other_user_url = reverse('alltime', kwargs={'username': 'test2'})
        cls.token = RefreshToken.for_user(user1)

        return super().setUpTestData()

