from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField, ValidationError

from .constants import USER_FIELDS_UPDATE, PROFILE_FIELDS_UPDATE
from .models import Profile


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['pk', 'username', 'email']


class ProfileSerializer(ModelSerializer):
    user = UserSerializer('user')

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'rating', 'games_played_count', 'wins_count',
                  'losses_count', 'draw_count', 'winning_percentage', 'photo']
        read_only_fields = ['rating', 'games_played_count', 'wins_count', 'losses_count', 'draw_count',
                            'winning_percentage']


class ProfileUpdateSerializer(ModelSerializer):
    first_name = CharField(source='user.first_name', required=False)
    last_name = CharField(source='user.last_name', required=False)

    class Meta:
        model = Profile
        fields = ['bio', 'photo', 'first_name', 'last_name']

    def validate(self, data):
        if not len(data.keys()):
            raise ValidationError({"empty object": "There is nothing to update"})
        return data

    def update(self, instance, validated_data, photo=None):
        user = {}
        profile = {}
        for field in validated_data:
            value = validated_data.get(field)
            if field in USER_FIELDS_UPDATE and value:
                user[field] = value
            elif field in PROFILE_FIELDS_UPDATE and value:
                profile[field] = value

        if photo:
            instance.photo.save(photo.name, photo)
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
