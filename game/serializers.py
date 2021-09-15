from hashids import Hashids
from rest_framework import serializers

from user_profile.serializers import ProfileGameSerializer
from xiangqi_django.settings import SECRET_KEY
from .models import Game

hashids = Hashids(SECRET_KEY, min_length=8)


class GameSerializer(serializers.ModelSerializer):
    player_1 = ProfileGameSerializer('profile_1')
    player_2 = ProfileGameSerializer('profile_1')
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return hashids.encode(obj.id)

    class Meta:
        model = Game
        fields = ['id', 'is_active', 'is_public', 'is_rated', 'is_timed', 'move_timer', 'game_timer', 'side',
                  'player_1', 'player_2', 'game_board', 'hit_pieces', 'history', 'player_turn', 'connected_player']


class ListGameSerializer(serializers.ModelSerializer):
    player_1 = ProfileGameSerializer('profile_1', read_only=True)
    player_2 = ProfileGameSerializer('profile_1', read_only=True)
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return hashids.encode(obj.id)

    class Meta:
        model = Game
        fields = ['id', 'is_active', 'is_public', 'is_rated', 'is_timed', 'move_timer', 'game_timer', 'side',
                  'player_1', 'player_2', 'player_turn']
