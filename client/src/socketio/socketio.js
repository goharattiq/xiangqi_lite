import { io } from 'socket.io-client';

// eslint-disable-next-line import/no-cycle
import store from '../redux/store';
import { setToast } from '../redux/toast/actions';
import { SOCKET_URL } from './constants';

// eslint-disable-next-line import/no-mutable-exports
export let socket;

export const connectSockets = () => (dispatch) => {
  const { auth } = store.getState();
  // eslint-disable-next-line camelcase
  const { access_token } = auth;
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    query: {
      access_token,
    },
  });

  socket.on('connect_error', () => {
    socket.disconnect();
    dispatch(setToast('Connection Lost', 'danger'));
  });
};
