from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from xiangqi_user_profile.models import Profile

class TestView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user1 = User.objects.create_user(username='test1', email='test1@gmail.com', password='admin1')
        user2 = User.objects.create_user(username='test2', email='test2@gmail.com', password='admin1')

        cls.get_leaderboard_url = reverse('profile:get_leaderboard')
        cls.search_username_url = reverse('profile:search_username')
        cls.session_user_profile_url = reverse('profile:retrieve_profile', kwargs={'username': user1.username})
        cls.other_user_profile_url = reverse('profile:retrieve_profile', kwargs={'username': user2.username})
        cls.user_profile_notfound_url = reverse('profile:retrieve_profile', kwargs={'username': 'abcdef'})

        cls.token = RefreshToken.for_user(user1)

        return super().setUpTestData()

    def test_without_auth(self):
        response = self.client.get(self.get_leaderboard_url)
        self.assertEqual(response.status_code, 401)

    def test_get_leaderboard_with_auth(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.get_leaderboard_url)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data[0], None)
        self.assertNotEqual(response.data[1], None)

    def test_search_username(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.search_username_url,**{'QUERY_STRING': 'username=test2'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['username'], 'test2')

    def test_get_session_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.session_user_profile_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], 'test1')

    def test_get_other_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.other_user_profile_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], 'test2')

    def test_get_user_profile_notfound(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(self.user_profile_notfound_url)
        self.assertEqual(response.status_code, 404)

    def test_put_session_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.put(self.session_user_profile_url, {
            'bio': 'Hello Man',
            'last_name': 'khan'
        })
        self.assertEqual(response.status_code, 202)

    def test_put_session_user_profile_without_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.put(self.session_user_profile_url)
        self.assertEqual(response.status_code, 204)

    def test_put_other_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.put(self.other_user_profile_url,{
            'bio': 'Hello Man',
            'last_name': 'khan'
        })
        self.assertEqual(response.status_code, 403)

    def test_put_user_profile_notfound(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.put(self.user_profile_notfound_url,{
            'bio': 'Hello Man',
            'last_name': 'khan'
        })
        self.assertEqual(response.status_code, 403)
