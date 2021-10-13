import { sendMessage } from '../redux/chat/actions';
import { CHAT_MESSAGE_RECEIVED, CHAT_MESSAGE_SEND } from './constants';
import { socket } from './socketio';

// eslint-disable-next-line camelcase
export const socketSendMessage = (message, game_id) => {
  socket.emit(CHAT_MESSAGE_SEND, { message, game_id });
};

export const subscribeChatSocketEvents = (dispatch) => {
  if (socket) {
    socket.on(CHAT_MESSAGE_RECEIVED, (message) => {
      dispatch(sendMessage(message));
    });
  }
};
