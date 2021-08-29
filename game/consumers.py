import socketio
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from game.models import Game
from game.serializers import GameSerializer

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)


@sio.on('game.piece_move')
async def piece_move(sid, data):
    # TODO store in db
    # TODO player Turn
    await update_game(data)
    await sio.emit('game.move_success', data=data['move'], room=str(data['gameID']), skip_sid=sid)


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
    if environ['asgi.scope']['user'].is_anonymous:
        return False

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
        player_2=User.objects.filter(id=game_params['player_2']).first(),
        game_board=game_params['game_board']
    )
    game.save()
    return GameSerializer(game).data


@sync_to_async
def update_game(data):
    previous_instance = Game.objects.get(pk=data['gameID'])
    print(previous_instance)
    hit_pieces = previous_instance.hit_pieces
    history = previous_instance.history
    print(hit_pieces)
    hit_pieces.append(data['move']['hit'])
    hit_pieces = list(filter(None, hit_pieces))
    print(hit_pieces)

    history.append(data['move'])
    history = list(filter(None, history))

    Game.objects.filter(pk=data['gameID']).update(
        game_board=data['board'],
        history=history,
        hit_pieces=hit_pieces,
    )