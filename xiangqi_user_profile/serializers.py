from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

from .models import Profile


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

    def update(self, instance, validated_data):
        user = {}
        profile = {}
        for field in validated_data:
            value = validated_data.get(field)
            if User.field_exists(field) and value:
                user[field] = value
            elif Profile.field_exists(field):
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
