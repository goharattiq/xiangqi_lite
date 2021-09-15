import socketio
from asgiref.sync import sync_to_async
from django.db.models import F

from game.models import Game
from game.serializers import GameSerializer
from user_profile.models import Profile
from hashids import Hashids
from xiangqi_django.settings import SECRET_KEY

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

hashids = Hashids(SECRET_KEY, min_length=8)


@sio.on('chat.send')
async def send_message(sid, data):
    room_id = hashids.decode(data['gameID'])[0]

    await sio.emit('chat.received',
                   data=data['message'],
                   room=str(room_id),
                   skip_sid=sid)


@sio.on('game.piece_move')
async def piece_move(sid, data):
    data['gameID'] = hashids.decode(data['gameID'])[0]

    player_turn = await update_game(data)
    await sio.emit('game.move_success',
                   data={'move': data['move'], 'playerTurn': player_turn},
                   room=str(data['gameID']),
                   skip_sid=sid)


@sio.on('game.set_params')
async def send_game_params(sid, game_params):
    instance = await create_game(game_params)
    game_id = hashids.decode(instance['id'])[0]
    await join_room(sid, game_id)

    session = await sio.get_session(sid)
    await player_in_game(session['user'], 'JOIN_GAME', str(game_id))
    instance = await get_game(game_id)
    await sio.emit('game.success', data=instance, room=str(game_id))


@sio.on('game.enter')
async def enter_game(sid, game_id):
    game_id = hashids.decode(game_id)[0]

    session = await sio.get_session(sid)
    user = session['user']
    await player_in_game(session['user'], 'JOIN_GAME', str(game_id))

    instance = await get_game(game_id)
    sio.enter_room(sid, str(game_id))
    instance['player_1']['side'] = instance['side']
    instance['player_2']['side'] = 'Black' \
        if instance['side'] == 'Red' else 'Red'

    if instance['player_1']['user']['pk'] == user.id \
            or instance['player_2']['user']['pk'] == user.id:
        await sio.emit('game.send_params', data=instance, room=str(game_id))
    else:
        await sio.emit('game.send_params', to=sid, data=instance, room=str(game_id))


@sio.on('game.leave')
async def leave_game(sid, game_id):
    if game_id is None: return
    game_id = hashids.decode(game_id)[0]
    session = await sio.get_session(sid)
    user = session['user']
    await player_in_game(user, 'LEAVE_GAME', str(game_id))
    instance = await get_game(game_id)

    if instance['player_1']['user']['pk'] == user.id \
            or instance['player_2']['user']['pk'] == user.id:
        await sio.emit('game.send_params', data=instance, room=str(game_id), skip_sid=sid)
    else:
        await sio.emit('game.send_params', to=sid, data=instance, room=str(game_id))

    sio.leave_room(sid, str(game_id))


@sio.on('game.end')
async def end_game(sid, data):
    data['gameID'] = hashids.decode(data['gameID'])[0]
    winner_username = await end_game_update(data)
    await sio.emit('game.announce_winner', data=winner_username, room=str(data['gameID']))


@sio.on('connect')
async def connect(sid, environ):
    if environ['asgi.scope']['user'].is_anonymous:
        return False
    await sio.save_session(sid, {'user': environ['asgi.scope']['user']})


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
    user_owner = Profile.objects.filter(user__username=game_params['player_1']).first()
    user_invitee = Profile.objects.filter(user__username=game_params['player_2']).first()
    game = Game.objects.create(
        is_public=True if game_params['gameType'] == 'Public' else False,
        is_rated=True if game_params['gameRated'] == 'Rated' else False,
        is_timed=True if game_params['gameTimed'] == 'Timed' else False,
        move_timer=game_params['moveTime'],
        game_timer=game_params['gameTimer'],
        side=game_params['side'],
        player_1=user_owner,
        player_2=user_invitee,
        game_board=game_params['game_board'],
        player_turn=user_owner.user.id
    )
    game.save()
    return GameSerializer(game).data


@sync_to_async
def update_game(data):
    previous_instance = Game.objects.get(pk=data['gameID'])

    hit_pieces = previous_instance.hit_pieces
    history = previous_instance.history
    player_turn = previous_instance.player_turn

    player_turn = previous_instance.player_2.user_id \
        if previous_instance.player_1.user_id == player_turn else previous_instance.player_1.user_id

    hit_pieces.append(data['move']['hit'])
    hit_pieces = list(filter(None, hit_pieces))

    history.append(data['move'])
    history = list(filter(None, history))

    Game.objects.filter(pk=data['gameID']).update(
        game_board=data['board'],
        history=history,
        hit_pieces=hit_pieces,
        player_turn=player_turn
    )
    return player_turn


@sync_to_async
def end_game_update(data):
    print('end game===>',data)
    player_1 = data['players']['player_1']
    player_2 = data['players']['player_2']
    looser = data['looser']
    points = 25 if data['type'] == 'END_TIME' and data['isRated'] else 50 if data['isRated'] else 0

    winning = player_1['user']['pk'] if player_2['user']['pk'] == looser else player_2['user']['pk']

    looser_instance = Profile.objects.filter(user_id=looser)
    winning_instance = Profile.objects.filter(user_id=winning)

    looser_instance.update(
        games_played_count=F('games_played_count') + 1,
        losses_count=F('losses_count') + 1,
        rating=F('rating') + (-points),
        winning_percentage=F('wins_count') / (F('games_played_count') + 1) * 100,
    )

    winning_instance.update(
        games_played_count=F('games_played_count') + 1,
        wins_count=F('wins_count') + 1,
        rating=F('rating') + points,
        winning_percentage=(F('wins_count') + 1) / (F('games_played_count') + 1) * 100,
    )

    Game.objects.filter(pk=data['gameID']).update(
        is_active=False,
        winner=winning_instance.first().user.username
    )

    return winning_instance.first().user.username


@sync_to_async
def player_in_game(user, type, game_id):
    instance = Game.objects.filter(pk=game_id)

    if instance.first().player_1.user_id == user.id \
            or instance.first().player_2.user_id == user.id:
        count = 1 if type == 'JOIN_GAME' else -1
        instance = Game.objects.filter(pk=game_id).first()
        cp = instance.connected_player
        cp = cp + count if 0 <= cp + count <= 2 else 0 if cp + count < 0 else 2
        instance.connected_player = cp;
        instance.save()
    return
