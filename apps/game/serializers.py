from hashids import Hashids
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from apps.user_profile.serializers import ProfileGameSerializer
from xiangqi_lite.settings import SECRET_KEY
from .models import Game, Player

hashids = Hashids(SECRET_KEY, min_length=8)


class PlayerSerializer(ModelSerializer):
    profile = ProfileGameSerializer('profile')

    class Meta:
        model = Player
        fields = ['id', 'profile', 'is_connected', 'side', 'time']


class GameSerializer(ModelSerializer):
    player_1 = PlayerSerializer('player_1')
    player_2 = PlayerSerializer('player_2')
    id = SerializerMethodField()

    def get_id(self, obj):
        return hashids.encode(obj.id)

    class Meta:
        model = Game
        fields = ['id', 'player_1', 'player_2', 'is_active', 'is_public', 'is_rated', 'is_timed', 'game_board',
                  'hit_pieces', 'history', 'player_turn', 'winner']


class ListGameSerializer(ModelSerializer):
    player_1 = PlayerSerializer('player_1', read_only=True)
    player_2 = PlayerSerializer('player_2', read_only=True)
    id = SerializerMethodField()

    def get_id(self, obj):
        return hashids.encode(obj.id)

    class Meta:
        model = Game
        fields = ['id', 'player_1', 'player_2', 'is_active', 'is_public', 'is_rated', 'is_timed', 'game_board',
                  'hit_pieces', 'history', 'player_turn', 'winner', 'game_timer', 'move_timer']
