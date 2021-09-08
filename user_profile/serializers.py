from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'first_name', 'last_name']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'rating', 'games_played_count',
                  'wins_count',
                  'losses_count', 'draw_count', 'winning_percentage', 'photo']

    def create(self, validated_data):
        user = User.objects.filter(id=validated_data['user']['id']).first()
        validated_data.pop('user')
        if not user:
            return None
        return Profile.objects.create(user_id=user.id, **validated_data)

    def update(self, instance, validated_data):
        user_id = validated_data['user']['id']
        validated_data['user'].pop('id')
        User.objects.filter(id=user_id).update(**validated_data['user'])
        validated_data.pop('user')
        Profile.objects.update(user_id=user_id, **validated_data)
        return Profile.objects.filter(user_id=user_id).first()


class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileGameSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'rating','photo']
