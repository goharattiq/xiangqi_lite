from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, )
    bio = models.TextField(_('bio'), max_length=500, blank=True)
    rating = models.IntegerField(_("ratings"), default=500)
    games_played_count = models.FloatField(_("games_played_count"), default=0)
    wins_count = models.FloatField(_("wins_count"), default=0)
    losses_count = models.FloatField(_("losses_count"), default=0)
    draw_count = models.FloatField(_("draw_count"), default=0)
    winning_percentage = models.FloatField(_("winning_percentage"), default=0)
    photo = models.ImageField(upload_to='images/' ,null=True,blank=True)

    def __str__(self):
        return self.user.username
