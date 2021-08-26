from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.utils.translation import gettext_lazy as _


# class Profile(AbstractUser):
#     bio = models.TextField(_('bio'), max_length=500, blank=True)
#     rating = models.IntegerField(_("ratings"), default=500)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, )
    bio = models.TextField(_('bio'), max_length=500, blank=True)
    rating = models.IntegerField(_("ratings"), default=500)
    games_played_count = models.IntegerField(_("games_played_count"), blank=True)
    wins_count = models.IntegerField(_("wins_count"), blank=True)
    losses_count = models.IntegerField(_("losses_count"), blank=True)
    draw_count = models.IntegerField(_("draw_count"), blank=True)
    winning_percentage = models.IntegerField(_("winning_percentage"), blank=True)

    def __str__(self):
        return self.user.username

    # REQUIRED_FIELDS =[]
    # USERNAME_FIELD = []