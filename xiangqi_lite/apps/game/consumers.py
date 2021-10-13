import logging

import socketio
from asgiref.sync import sync_to_async
from django.utils.timezone import now
from hashids import Hashids

from xiangqi_lite.settings import SECRET_KEY
from xiangqi_lite.apps.game.models import Game, Player
from xiangqi_lite.apps.game.serializers import GameSerializer
from xiangqi_lite.apps.user_profile.models import Profile
import xiangqi_lite.apps.game.constants as constants

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

hashids = Hashids(SECRET_KEY, min_length=8)
logger = logging.getLogger(__name__)


@sio.on(constants.CHAT_MESSAGE_SEND)
async def send_message(sid, data):
    room_id, *_ = hashids.decode(data.get(constants.GAME_ID))

    await sio.emit(constants.CHAT_MESSAGE_RECEIVED,
                   data=data.get(constants.MESSAGE),
                   room=str(room_id),
                   skip_sid=sid)


@sio.on(constants.GAME_MAKE_MOVE)
async def piece_move(sid, data):
    room_id, *_ = hashids.decode(data.get(constants.GAME_ID))
    data[constants.GAME_ID] = room_id
    session = await sio.get_session(sid)
    session_user = session.get(constants.USER)
    updated_game = await update_game(data, session_user)
    await sio.emit(constants.GAME_MOVE_SUCCESS,
                   data={
                       'move': data.get(constants.MOVE),
                       'playerTurn': updated_game.get(constants.PLAYER_TURN),
                       'player_1': updated_game.get(constants.PLAYER_1),
                       'player_2': updated_game.get(constants.PLAYER_2),
                   },
                   room=str(data.get(constants.GAME_ID)),
                   skip_sid=sid)


@sio.on(constants.GAME_CREATE)
async def send_game_params(sid, game_params):
    instance = await create_game(game_params)
    game_id, *_ = hashids.decode(instance.get(constants.ID))

    await join_room(sid, game_id)

    session = await sio.get_session(sid)
    instance = await player_in_game(session.get(constants.USER), constants.JOIN_GAME, str(game_id))
    await sio.emit(constants.GAME_SUCCESSFULLY_CREATED, data=instance, room=str(game_id))
    await sio.emit(constants.NOTIFICATION_GAME_CREATED, data={
        'gameID': instance.get(constants.ID),
        'creator': instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(constants.USERNAME),
        'invitee': instance.get(constants.PLAYER_2).get(constants.PROFILE).get(constants.USER).get(constants.USERNAME)
            if instance.get(constants.PLAYER_2) else None
    })


@sio.on(constants.GAME_ENTER)
async def enter_game(sid, game_id):
    game_id, *_ = hashids.decode(game_id)

    session = await sio.get_session(sid)
    user = session.get(constants.USER)
    instance = await player_in_game(user, constants.JOIN_GAME, str(game_id))
    if instance.get(constants.PLAYER_2) is None and \
            instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(constants.PK) != user.pk:
        await update_player_game(user, game_id)
        instance = await player_in_game(user, constants.JOIN_GAME, str(game_id))

    sio.enter_room(sid, str(game_id))

    if instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(constants.PK) == user.id \
            or instance.get(constants.PLAYER_2).get(constants.PROFILE).get(constants.USER).get(constants.PK) == user.id:
        await sio.emit(constants.GAME_SEND_PARAMS, data=instance, room=str(game_id))
        await sio.emit(constants.NOTIFICATION_PLAYERS_READY, data={
            'creator': instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(
                constants.USERNAME),
            'invitee': instance.get(constants.PLAYER_2).get(constants.PROFILE).get(constants.USER).get(
                constants.USERNAME)
            if instance.get(constants.PLAYER_2) else ''
        }, room=str(game_id), skip_sid=sid)
    else:
        await sio.emit(constants.GAME_SEND_PARAMS, to=sid, data=instance, room=str(game_id))


@sio.on(constants.GAME_LEAVE)
async def leave_game(sid, game_id):
    if game_id is None:
        return
    game_id, *_ = hashids.decode(game_id)
    session = await sio.get_session(sid)
    user = session.get(constants.USER)
    instance = await player_in_game(user, constants.LEAVE_GAME, str(game_id))

    if instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(constants.PK) == user.id \
            or instance.get(constants.PLAYER_2).get(constants.PROFILE).get(constants.USER).get(constants.PK) == user.id:
        await sio.emit(constants.GAME_SEND_PARAMS, data=instance, room=str(game_id), skip_sid=sid)
        await sio.emit(constants.NOTIFICATION_PLAYER_LEAVE, data={
            'creator': instance.get(constants.PLAYER_1).get(constants.PROFILE).get(constants.USER).get(
                constants.USERNAME),
            'invitee': instance.get(constants.PLAYER_2).get(constants.PROFILE).get(constants.USER).get(
                constants.USERNAME)
            if instance.get(constants.PLAYER_2) else ''
        }, room=str(game_id), skip_sid=sid)
    else:
        await sio.emit(constants.GAME_SEND_PARAMS, to=sid, data=instance, room=str(game_id))

    sio.leave_room(sid, str(game_id))


@sio.on(constants.GAME_END)
async def end_game(sid, data):
    room_id, *_ = hashids.decode(data.get(constants.GAME_ID))
    data[constants.GAME_ID] = room_id

    winner_username = await end_game_update(data)
    await sio.emit(constants.GAME_WINNER_ANNOUNCE, data=winner_username,
                   room=str(data.get(constants.GAME_ID)))


@sio.on(constants.CONNECT)
async def connect(sid, environ):
    if environ.get('asgi.scope').get(constants.USER).is_anonymous:
        return False
    await sio.save_session(sid, {'user': environ.get('asgi.scope').get(constants.USER)})


@sio.on(constants.DISCONNECT)
def disconnect(sid):
    logger.info(f'{sid}, client disconnected')


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
        side=constants.BLACK if instance.player_1.side == constants.RED else constants.RED
    )

    instance.player_2 = player_2
    instance.player_2.save()
    instance.save()


@sync_to_async
def create_game(game_params):
    user_owner = Profile.objects.filter(user__username=game_params.get(constants.PLAYER_1)).first()
    user_invitee = Profile.objects.filter(
        user__username=game_params.get(constants.PLAYER_2)).first()

    time = None
    if game_params.get(constants.GAME_TIMED) == constants.TIMED:
        time = {
            'move_time': int(game_params.get(constants.MOVE_TIME)),
            'game_time': int(game_params.get(constants.GAME_TIME)),
        }

    player_1 = Player.objects.create(
        profile=user_owner,
        is_connected=False,
        time=time,
        side=game_params.get(constants.SIDE)
    )

    player_2 = Player.objects.create(
        profile=user_invitee,
        is_connected=False,
        time=time,
        side=constants.BLACK if game_params.get(constants.SIDE) == constants.RED
        else constants.RED
    ) if user_invitee is not None else None

    game = Game.objects.create(
        is_public=True if game_params.get(constants.GAME_TYPE) == constants.PUBLIC else False,
        is_rated=True if game_params.get(constants.GAME_RATED) == constants.RATED else False,
        is_timed=True if game_params.get(constants.GAME_TIMED) == constants.TIMED else False,
        move_timer=game_params.get(constants.MOVE_TIME),
        game_timer=game_params.get(constants.GAME_TIME),
        game_board=game_params.get(constants.GAME_BOARD),
        player_turn=user_owner.user.id,
        player_1=player_1,
        player_2=player_2,
    )
    return GameSerializer(game).data


@sync_to_async
def update_game(data, session_user):
    instance = Game.objects.get(pk=data.get(constants.GAME_ID))

    hit_pieces = instance.hit_pieces
    history = instance.history
    player_turn = instance.player_turn

    instance.game_board = data.get(constants.GAME_BOARD)

    last_move = instance.last_move
    time_taken = ((now() - last_move).total_seconds() + constants.WAIT_TIME) / 60

    instance.player_turn = instance.player_2.profile.user_id \
        if instance.player_1.profile.user_id == player_turn else instance.player_1.profile.user_id

    hit_pieces.append(data.get(constants.MOVE).get(constants.HIT))
    instance.hit_pieces = list(filter(None, hit_pieces))

    history.append(data.get(constants.MOVE))
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
    return {'player_turn': instance.get(constants.PLAYER_TURN),
            'player_1': instance.get(constants.PLAYER_1),
            'player_2': instance.get(constants.PLAYER_2)}


@sync_to_async
def end_game_update(data):
    player_1 = data.get(constants.PLAYERS).get(constants.PLAYER_1)
    player_2 = data.get(constants.PLAYERS).get(constants.PLAYER_2)
    looser = data.get(constants.LOOSER)
    points = 25 if data.get(constants.TYPE) == constants.END_TIME and data.get(constants.IS_RATED) else 50 if data.get(constants.IS_RATED) else 0

    winning = player_1.get(constants.PROFILE).get(constants.USER).get(constants.PK) if player_2.get(constants.PROFILE).get(constants.USER).get(constants.PK) == looser \
        else player_2.get(constants.PROFILE).get(constants.USER).get(constants.PK)

    looser_instance = Profile.objects.filter(user_id=looser).first()

    looser_instance.games_played_count += 1
    looser_instance.losses_count += 1
    looser_instance.rating -= points
    looser_instance.save()

    winning_instance = Profile.objects.filter(user_id=winning).first()
    winning_instance.games_played_count += 1
    winning_instance.wins_count += 1
    winning_instance.rating += points
    winning_instance.save()

    Game.objects.filter(pk=data.get(constants.GAME_ID)).update(
        is_active=False,
        winner=winning_instance.user.username
    )

    return winning_instance.user.username


@sync_to_async
def player_in_game(user, type, game_id):
    instance = Game.objects.filter(pk=game_id).first()

    if instance.player_1.profile.user_id == user.id \
            or (instance.player_2 and instance.player_2.profile.user_id == user.id):

        last_move = instance.last_move

        if type == constants.LEAVE_GAME and both_players_connected(instance):
            time_taken = ((now() - last_move).total_seconds() + constants.WAIT_TIME) / 60

            if instance.is_timed and instance.player_turn == instance.player_1.profile.user_id:
                instance.player_1.time['game_time'] -= time_taken
            if instance.is_timed and instance.player_2 and instance.player_turn == instance.player_2.profile.user_id:
                instance.player_2.time['game_time'] -= time_taken

        if instance.player_1.profile.user_id == user.id:
            instance.player_1.is_connected = False if type == constants.LEAVE_GAME else True
        if instance.player_2 and instance.player_2.profile.user_id == user.id:
            instance.player_2.is_connected = False if type == constants.LEAVE_GAME else True

        instance.last_move = now()
        instance.player_1.save()
        if instance.player_2 is not None:
            instance.player_2.save()
        instance.save()
    return GameSerializer(instance).data


def both_players_connected(game):
    return game.player_1.is_connected and game.player_2 and game.player_2.is_connected
