from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, )
    bio = models.TextField(max_length=500, blank=True)
    rating = models.IntegerField(default=500)
    games_played_count = models.FloatField(default=0)
    wins_count = models.IntegerField(default=0)
    losses_count = models.IntegerField(default=0)
    photo = models.ImageField(upload_to='media/images/', null=True)

    @property
    def draw_count(self):
        return self.games_played_count - self.wins_count - self.losses_count

    @property
    def winning_percentage(self):
        try:
            percentage = self.wins_count / self.games_played_count * 100
        except ZeroDivisionError:
            percentage = 0
        return int(percentage)

    def __str__(self):
        return self.user.username


@classmethod
def model_field_exists(cls, field):
    try:
        cls._meta.get_field(field)
        return True
    except:
        return False


models.Model.field_exists = model_field_exists
