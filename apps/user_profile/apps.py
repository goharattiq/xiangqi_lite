from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    name = 'apps.user_profile'

    def ready(self):
        import apps.user_profile.signals
