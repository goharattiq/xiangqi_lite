from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='user.id')
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 'rating', 'games_played_count',
                  'wins_count',
                  'losses_count', 'draw_count', 'winning_percentage']

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