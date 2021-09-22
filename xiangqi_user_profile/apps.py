from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    name = 'xiangqi_user_profile'

    def ready(self):
        import xiangqi_user_profile.signals
