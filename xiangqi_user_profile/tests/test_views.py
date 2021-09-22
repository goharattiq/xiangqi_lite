from .test_setup import TestSetUp
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class TestView(TestSetUp):
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

    # profile get tests
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

    # profile put tests
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
