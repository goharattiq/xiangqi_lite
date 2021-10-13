export const CHAT_MESSAGE_SEND = 'chat.message_send';
export const CHAT_MESSAGE_RECEIVED = 'chat.message_received';

export const GAME_MAKE_MOVE = 'game.make_move';
export const GAME_MOVE_SUCCESS = 'game.move_success';
export const GAME_CREATE = 'game.create';
export const GAME_SUCCESSFULLY_CREATED = 'game.successfully_created';
export const GAME_ENTER = 'game.enter';
export const GAME_SEND_PARAMS = 'game.send_params';
export const GAME_LEAVE = 'game.leave';
export const GAME_END = 'game.end';
export const GAME_WINNER_ANNOUNCE = 'game.winner_announce';

export const NOTIFICATION_GAME_CREATED = 'notification.game_created';
export const NOTIFICATION_PLAYERS_READY = 'notification.players_ready';
export const NOTIFICATION_PLAYER_LEAVE = 'notification.player_leave';

export const CONNECT = 'connect';
export const DISCONNECT = 'disconnect';

const WS_SCHEME = window.location.protocol === 'https:' ? 'wss' : 'ws';
export const SOCKET_URL = `${WS_SCHEME}://${window.location.host}`;
