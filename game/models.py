from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import JSONField
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

from user_profile.models import Profile


class Player(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile')
    is_connected = models.BooleanField(_('is_connected'), default=False)
    time = JSONField(null=True, blank=True)
    side = models.CharField(_('side'), max_length=10, blank=True)


class Game(models.Model):
    is_active = models.BooleanField(_('is_active'), default=True)
    is_public = models.BooleanField(_('is_public'), default=True)
    is_rated = models.BooleanField(_('is_rated'), default=True)
    is_timed = models.BooleanField(_('is_timed'), default=True)
    move_timer = models.IntegerField(_('move_timer'), default=1)
    game_timer = models.IntegerField(_('game_timer'), default=30)
    last_move = models.DateTimeField(default=now)
    player_1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_1', null=True)
    player_2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_2', null=True)
    game_board = JSONField(blank=True)
    hit_pieces = ArrayField(JSONField(), default=list, blank=True)
    history = ArrayField(JSONField(), default=list, blank=True)
    player_turn = models.IntegerField(_('player_turn'), default=-1)
    winner = models.CharField(_('winner'), null=True, max_length=255, blank=True)
