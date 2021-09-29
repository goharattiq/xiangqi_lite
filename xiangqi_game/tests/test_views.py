from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class TestView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user1 = User.objects.create_user(username='test1', email='test1@gmail.com', password='admin1')

        cls.active_game_url = reverse(viewname='game:active')
        cls.spectate_game_url = reverse('game:spectate',current_app='game')
        cls.alltime_game_session_user_url = reverse('game:alltime', kwargs={'username': user1.username},current_app='game')
        cls.alltime_game_other_user_url = reverse('game:alltime', kwargs={'username': 'test2'},current_app='game')
        cls.token = RefreshToken.for_user(user1)

        return super().setUpTestData()

    def test_without_auth(self):
        response = self.client.get(self.active_game_url)
        self.assertEqual(response.status_code, 401)

    def test_active_game(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.active_game_url)
        self.assertEqual(response.status_code, 200)


    def test_get_spectate_game(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.spectate_game_url)
        self.assertEqual(response.status_code, 200)


    def test_get_alltime_session_user_game(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.alltime_game_session_user_url)
        self.assertEqual(response.status_code, 200)

    def test_get_alltime_other_user_game(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.alltime_game_other_user_url)
        self.assertEqual(response.status_code, 200)