from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

from .models import Profile

from .constants import USER_FIELDS_UPDATE,PROFILE_FIELDS_UPDATE

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'first_name', 'last_name']


class ProfileSerializer(ModelSerializer):
    user = UserSerializer('user')

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'rating', 'games_played_count', 'wins_count',
                  'losses_count', 'draw_count', 'winning_percentage', 'photo']

    def get_winning_percentage(self, obj):
        return int(obj.winning_percentage)

    def update(self, instance, validated_data):
        user = {}
        profile = {}
        for field in validated_data:
            value = validated_data.get(field)
            if field in USER_FIELDS_UPDATE and User.field_exists(field) and value:
                user[field] = value
            elif field in PROFILE_FIELDS_UPDATE and Profile.field_exists(field) and value:
                if field == 'photo':
                    instance = Profile.objects.filter(user__username=instance.user.username).first()
                    instance.photo.save(value.name, value)
                    continue
                profile[field] = value

        user_updated = User.objects.filter(username=instance.user.username).update(**user)
        profile_updated = Profile.objects.filter(user__username=instance.user.username).update(**profile)
        return user_updated or profile_updated


class UserSearchSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileGameSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'rating', 'photo']
