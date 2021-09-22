from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from xiangqi_user_profile.models import Profile

class TestSetUp(APITestCase):
    @classmethod
    def setUpTestData(cls):

        user1 = User.objects.create_user(username='test1', email='test1@gmail.com', password='admin1')
        user2 = User.objects.create_user(username='test2', email='test2@gmail.com', password='admin1')

        cls.get_leaderboard_url = reverse('get_leaderboard')
        cls.search_username_url = reverse('search_username')
        cls.session_user_profile_url = reverse('retrieve_profile', kwargs={'username': user1.username})
        cls.other_user_profile_url = reverse('retrieve_profile', kwargs={'username': user2.username})
        cls.user_profile_notfound_url = reverse('retrieve_profile', kwargs={'username': 'abcdef'})

        cls.token = RefreshToken.for_user(user1)

        return super().setUpTestData()