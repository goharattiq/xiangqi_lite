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

    def create(self, validated_data):
        user = User.objects.filter(id=validated_data).first()
        if not user:
            return None
        return Profile.objects.create(user_id=user.id)

    def update(self, instance, validated_data):
        username = instance.user.username
        user_fields = ['email', 'first_name', 'last_name']
        user = {}
        for field in user_fields:
            value = validated_data.get(field)
            if value is not None:
                user[field] = value
        User.objects.filter(username=username).update(**user)

        profile = {}
        profile_fields = ['bio', 'photo']
        for field in profile_fields:
            value = validated_data.get(field)
            if value is not None and value != '':
                if field == 'photo':
                    instance = Profile.objects.filter(user__username=username).first()
                    instance.photo.save(value.name, value)
                    continue
                profile[field] = value

        Profile.objects.filter(user__username=username).update(**profile)
        return Profile.objects.filter(user__username=username).first()


class UserSearchSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileGameSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'rating', 'photo']
