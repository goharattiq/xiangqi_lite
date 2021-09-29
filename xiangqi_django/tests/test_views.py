from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User

class TestView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.signin_url = reverse('rest_login')
        cls.signup_url = reverse('rest_register')

        cls.signup_data = {
            "username": "test2",
            "email": "test2@gmail.com",
            "password1": "admin1",
            "password2": "admin1"
        }
        User.objects.create_user(username='test1', email='test1@gmail.com', password='admin1')

        cls.signin_data = {
            "username": "test1",
            "password": "admin1"
        }
        return super().setUpTestData()

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
