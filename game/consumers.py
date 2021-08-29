import socketio
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from game.models import Game
from game.serializers import GameSerializer

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)


@sio.on('game.set_params')
async def send_game_params(sid, game_params):
    instance = await create_game(game_params)
    await join_room(sid, instance['id'])
    await sio.emit('game.success', data=instance, room=str(instance['id']))


@sio.on('game.enter')
async def enter_game(sid, game_id):
    instance = await get_game(game_id)
    await join_room(sid, game_id)
    await sio.emit('game.send_params', data=instance, room=str(game_id))


@sio.on('connect')
async def connect(sid, environ):
    print(sid, 'connect')


@sio.on('disconnect')
def disconnect(sid):
    print(sid, 'Client disconnected')


@sync_to_async
def join_room(sid, game_id):
    sio.enter_room(sid, str(game_id))


@sync_to_async
def get_game(game_id):
    return GameSerializer(Game.objects.filter(id=game_id).first()).data


@sync_to_async
def create_game(game_params):
    game = Game.objects.create(
        is_public=True if game_params['gameType'] == 'Public' else False,
        is_rated=True if game_params['gameRated'] == 'Rated' else False,
        is_timed=True if game_params['gameTimed'] == 'Timed' else False,
        move_timer=game_params['moveTime'],
        game_timer=game_params['gameTimer'],
        side=game_params['side'],
        player_1=User.objects.filter(id=game_params['player_1']).first(),
        player_2=User.objects.filter(id=game_params['player_2']).first()
    )
    game.save()
    return GameSerializer(game).data
