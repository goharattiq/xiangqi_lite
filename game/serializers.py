from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    player_name_1 = serializers.CharField(source='player_1.username', read_only=True)
    player_name_2 = serializers.CharField(source='player_2.username', read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'is_public', 'is_rated', 'is_timed', 'move_timer', 'game_timer', 'side', 'player_name_1',
                  'player_name_2', 'game_board']
