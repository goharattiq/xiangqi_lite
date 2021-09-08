from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import JSONField
from django.utils.translation import gettext_lazy as _

from user_profile.models import Profile


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
    is_active = models.BooleanField(_('is_active'), default=True)
    side = models.CharField(_('side'), max_length=10, blank=True)
    player_1 = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='player_1', null=True)
    player_2 = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='player_2', null=True)
    game_board = ArrayField(ArrayField(JSONField(), size=9, default=list, blank=True),
                            size=10, default=list, blank=True)
    hit_pieces = ArrayField(JSONField(), default=list)
    history = ArrayField(JSONField(), default=list)
    player_turn = models.IntegerField(_('player_turn'), default=-1)
    connected_player = models.IntegerField(_('connected_player'), default=0 )

    def clean(self):
        if self.player_1.user_id == self.player_2.user_id:
            raise ValidationError('Players should be different')

        if self.move_timer not in self.timer.keys():
            raise ValidationError('Please select correct value')

        if self.game_timer not in self.timer[self.move_timer]:
            raise ValidationError('Please select correct value')

        if self.connected_player < 0 or self.connected_player > 1:
            raise ValidationError('Please select correct value')