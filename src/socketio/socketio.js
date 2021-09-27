import { io } from 'socket.io-client';

import { setToast } from '../redux/toast/actions';
import { SOCKET_URL } from './constants';

// eslint-disable-next-line import/no-mutable-exports
export let socket;

export const connectSockets = (
  accessToken, dispatch,
) => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    query: {
      access_token: accessToken,
    },
  });

  socket.on('connect_error', () => {
    socket.disconnect();
    dispatch(setToast('Connection Lost', 'danger', dispatch));
  });
};
