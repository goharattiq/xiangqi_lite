import { io } from 'socket.io-client';

import { SOCKET_URL } from '../utils/constants';

// eslint-disable-next-line import/no-mutable-exports
export let socket;

export const useSockets = (
  accessToken,
) => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    query: {
      access_token: accessToken,
    },
  });

  socket.connect(() => {
  });

  socket.on('connect_error', () => {
    socket.disconnect();
  });
  return () => {
    socket.disconnect(() => {

    });
  };
};
