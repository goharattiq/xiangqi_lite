from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    name = 'xiangqi_lite.apps.user_profile'

    def ready(self):
        import xiangqi_lite.apps.user_profile.signals
