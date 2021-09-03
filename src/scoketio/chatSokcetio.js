import { messageSend } from '../redux/chat/actions';
import { socket } from './socketio';

export const socketSendMessage = (message, gameID) => {
  socket.emit('chat.send', { message, gameID });
};

export const subscribeChatSocketsEvent = (dispatch) => {
  if (socket) {
    socket.on('chat.recevied', (message) => {
      dispatch(messageSend(message));
    });
  }
};
