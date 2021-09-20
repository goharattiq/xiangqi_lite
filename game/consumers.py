import socketio
from asgiref.sync import sync_to_async
from django.db.models import F
from django.utils.timezone import now
from hashids import Hashids

from game.models import Game, Player
from game.serializers import GameSerializer
from user_profile.models import Profile
from xiangqi_django.constants import WAIT_TIME, BLACK, RED
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
    session = await sio.get_session(sid)
    session_user = session['user']
    updated_game = await update_game(data, session_user)
    await sio.emit('game.move_success',
                   data={'move': data['move'], 'playerTurn': updated_game['player_turn'],
                         'player_1': updated_game['player_1'], 'player_2': updated_game['player_2']},
                   room=str(data['gameID']),
                   skip_sid=sid)


@sio.on('game.set_params')
async def send_game_params(sid, game_params):
    instance = await create_game(game_params)
    game_id = hashids.decode(instance['id'])[0]
    await join_room(sid, game_id)

    session = await sio.get_session(sid)
    instance = await player_in_game(session['user'], 'JOIN_GAME', str(game_id))
    await sio.emit('game.success', data=instance, room=str(game_id))
    await sio.emit('game.created_notification', data={
        'gameID': instance['id'],
        'creator': instance['player_1']['profile']['user']['username'],
        'invitee': instance['player_2']['profile']['user']['username'] if instance['player_2'] else ''
    })


@sio.on('game.enter')
async def enter_game(sid, game_id):
    game_id = hashids.decode(game_id)[0]

    session = await sio.get_session(sid)
    user = session['user']
    instance = await player_in_game(user, 'JOIN_GAME', str(game_id))

    if instance['player_2'] is None and instance['player_1']['profile']['user']['pk'] is not user.pk:
        await update_player_game(user, game_id)
        instance = await player_in_game(user, 'JOIN_GAME', str(game_id))

    sio.enter_room(sid, str(game_id))

    if instance['player_1']['profile']['user']['pk'] == user.id \
            or instance['player_2']['profile']['user']['pk'] == user.id:
        await sio.emit('game.send_params', data=instance, room=str(game_id))
        await sio.emit('game.players_ready', data={
            'creator': instance['player_1']['profile']['user']['username'],
            'invitee': instance['player_2']['profile']['user']['username'] if instance['player_2'] else ''
        }, room=str(game_id), skip_sid=sid)
    else:
        await sio.emit('game.send_params', to=sid, data=instance, room=str(game_id))


@sio.on('game.leave')
async def leave_game(sid, data):
    game_id = data['gameID']
    if game_id is None:
        return
    game_id = hashids.decode(game_id)[0]
    session = await sio.get_session(sid)
    user = session['user']
    instance = await player_in_game(user, 'LEAVE_GAME', str(game_id))

    if instance['player_1']['profile']['user']['pk'] == user.id \
            or instance['player_2']['profile']['user']['pk'] == user.id:
        await sio.emit('game.send_params', data=instance, room=str(game_id), skip_sid=sid)
        await sio.emit('game.player_leave', data={
            'creator': instance['player_1']['profile']['user']['username'],
            'invitee': instance['player_2']['profile']['user']['username'] if instance['player_2'] else ''
        }, room=str(game_id), skip_sid=sid)
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
def update_player_game(user, game_id):
    user_invitee = Profile.objects.filter(user__username=user.username).first()
    instance = Game.objects.filter(id=game_id).first()
    time = None
    if instance.is_timed:
        time = {
            'move_time': instance.move_timer,
            'game_time': instance.game_timer,
        }

    player_2 = Player.objects.create(
        profile=user_invitee,
        is_connected=False,
        time=time,
        side=BLACK if instance.player_1.side == RED else RED
    )

    instance.player_2 = player_2
    instance.player_2.save()
    instance.save()


@sync_to_async
def create_game(game_params):
    user_owner = Profile.objects.filter(user__username=game_params['player_1']).first()
    user_invitee = Profile.objects.filter(user__username=game_params['player_2']).first()

    time = None
    if game_params['gameTimed'] == 'Timed':
        time = {
            'move_time': int(game_params['moveTime']),
            'game_time': int(game_params['gameTimer']),
        }

    player_1 = Player.objects.create(
        profile=user_owner,
        is_connected=False,
        time=time,
        side=game_params['side']
    )

    player_2 = Player.objects.create(
        profile=user_invitee,
        is_connected=False,
        time=time,
        side=BLACK if game_params['side'] == RED else RED
    ) if user_invitee is not None else None

    game = Game.objects.create(
        is_public=True if game_params['gameType'] == 'Public' else False,
        is_rated=True if game_params['gameRated'] == 'Rated' else False,
        is_timed=True if game_params['gameTimed'] == 'Timed' else False,
        move_timer=game_params['moveTime'],
        game_timer=game_params['gameTimer'],
        game_board=game_params['game_board'],
        player_turn=user_owner.user.id,
        player_1=player_1,
        player_2=player_2,
    )
    return GameSerializer(game).data


@sync_to_async
def update_game(data, session_user):
    instance = Game.objects.get(pk=data['gameID'])

    hit_pieces = instance.hit_pieces
    history = instance.history
    player_turn = instance.player_turn

    instance.game_board = data['board']

    last_move = instance.last_move
    time_taken = ((now() - last_move).total_seconds() + WAIT_TIME) / 60

    instance.player_turn = instance.player_2.profile.user_id \
        if instance.player_1.profile.user_id == player_turn else instance.player_1.profile.user_id

    hit_pieces.append(data['move']['hit'])
    instance.hit_pieces = list(filter(None, hit_pieces))

    history.append(data['move'])
    instance.history = list(filter(None, history))

    if instance.is_timed and session_user.pk == instance.player_1.profile.user_id:
        instance.player_1.time['game_time'] -= time_taken
    if instance.is_timed and session_user.pk == instance.player_2.profile.user_id:
        instance.player_2.time['game_time'] -= time_taken

    instance.last_move = now()

    instance.player_1.save()
    instance.player_2.save()
    instance.save()
    instance = GameSerializer(instance).data
    return {'player_turn': instance['player_turn'], 'player_1': instance['player_1'], 'player_2': instance['player_2']}


@sync_to_async
def end_game_update(data):
    player_1 = data['players']['player_1']
    player_2 = data['players']['player_2']
    looser = data['looser']
    points = 25 if data['type'] == 'END_TIME' and data['isRated'] else 50 if data['isRated'] else 0

    winning = player_1['profile']['user']['pk'] if player_2['profile']['user']['pk'] == looser \
        else player_2['profile']['user']['pk']

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
    instance = Game.objects.filter(pk=game_id).first()

    if instance.player_1.profile.user_id == user.id \
            or (instance.player_2 and instance.player_2.profile.user_id == user.id):

        last_move = instance.last_move

        if type == 'LEAVE_GAME' and both_players_connected(instance):
            time_taken = ((now() - last_move).total_seconds() + WAIT_TIME) / 60

            if instance.is_timed and instance.player_turn == instance.player_1.profile.user_id:
                instance.player_1.time['game_time'] -= time_taken
            if instance.is_timed and instance.player_2 and instance.player_turn == instance.player_2.profile.user_id:
                instance.player_2.time['game_time'] -= time_taken

        if instance.player_1.profile.user_id == user.id:
            instance.player_1.is_connected = False if type == 'LEAVE_GAME' else True
        if instance.player_2 and instance.player_2.profile.user_id == user.id:
            instance.player_2.is_connected = False if type == 'LEAVE_GAME' else True

        instance.last_move = now()
        instance.player_1.save()
        if instance.player_2 is not None:
            instance.player_2.save()
        instance.save()
    return GameSerializer(instance).data


def both_players_connected(game):
    return game.player_1.is_connected and game.player_2 and game.player_2.is_connected
