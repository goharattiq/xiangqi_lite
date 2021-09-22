from .test_setup import TestSetUp


class TestView(TestSetUp):
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