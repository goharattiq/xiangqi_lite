from .test_setup import TestSetUp


class TestView(TestSetUp):
    def test_user_cannot_signup_without_data(self):
        response = self.client.post(self.signup_url)
        self.assertEqual(response.status_code, 400)

    def test_user_can_signup(self):
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.data['access_token'], None)
        self.assertEqual(response.data['user']['username'], self.signup_data['username'])
        self.assertEqual(response.data['user']['email'], self.signup_data['email'])

    def test_user_cannot_signin_without_data(self):
        response = self.client.post(self.signin_url)
        self.assertEqual(response.status_code, 400)

    def test_user_cannot_signin_unverified_data(self):
        response = self.client.post(self.signin_url, self.signup_data)
        self.assertEqual(response.status_code, 400)

    def test_user_can_signin(self):
        response = self.client.post(self.signin_url, self.signin_data)
        self.assertEqual(response.status_code, 200)
