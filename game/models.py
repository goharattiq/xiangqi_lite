from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField


class Game(models.Model):
    timer = {
        1: [5, 10, 20, 30, 60],
        2: [10, 20, 30, 60],
        5: [20, 30, 60],
        10: [30, 60]
    }
    is_public = models.BooleanField(_('is_public'), default=True)
    is_rated = models.BooleanField(_('is_rated'), default=True)
    is_timed = models.BooleanField(_('is_timed'), default=True)
    move_timer = models.IntegerField(_('move_timer'), default=1)
    game_timer = models.IntegerField(_('game_timer'), default=30)
    player_1 = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, related_name='player_1')
    player_2 = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, related_name='player_2')
    game_board = ArrayField(ArrayField(models.CharField(max_length=1, default=''), size=10), size=9)

    def clean(self):
        if self.player_1 == self.player_2:
            raise ValidationError('Players should be different')

        if self.move_timer not in self.timer.keys():
            raise ValidationError('Please select correct value')

        if self.game_timer not in self.timer[self.move_timer]:
            raise ValidationError('Please select correct value')
