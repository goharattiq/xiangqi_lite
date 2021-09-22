from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User


class TestSetUp(APITestCase):
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
        User.objects.create_user(username='test1',email='test1@gmail.com',password='admin1')

        cls.signin_data = {
            "username": "test1",
            "password": "admin1"
        }
        return super().setUpTestData()