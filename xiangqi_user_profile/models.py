from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, )
    bio = models.TextField(max_length=500, blank=True)
    rating = models.IntegerField(default=500)
    games_played_count = models.FloatField(default=0)
    wins_count = models.IntegerField(default=0)
    losses_count = models.IntegerField(default=0)
    draw_count = models.IntegerField(default=0)
    winning_percentage = models.FloatField(default=0)
    photo = models.ImageField(upload_to='media/images/', null=True, blank=True)

    def __str__(self):
        return self.user.username
