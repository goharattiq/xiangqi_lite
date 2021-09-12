from rest_framework import serializers
from user_profile.serializers import ProfileGameSerializer
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    player_1 = ProfileGameSerializer('profile_1')
    player_2 = ProfileGameSerializer('profile_1')

    class Meta:
        model = Game
        fields = ['id', 'is_active', 'is_public', 'is_rated', 'is_timed', 'move_timer', 'game_timer', 'side',
                  'player_1', 'player_2', 'game_board', 'hit_pieces', 'history', 'player_turn', 'connected_player']


class ListGameSerializer(serializers.ModelSerializer):
    player_1 = ProfileGameSerializer('profile_1',read_only=True)
    player_2 = ProfileGameSerializer('profile_1',read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'is_active', 'is_public', 'is_rated', 'is_timed', 'move_timer', 'game_timer', 'side',
                  'player_1', 'player_2', 'player_turn']
