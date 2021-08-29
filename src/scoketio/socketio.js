/* eslint-disable camelcase */
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

let socket;

export const useSockets = (
  accessToken,
) => {
  // const dispatch = useDispatch();
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    query: {
      access_token: accessToken,
    },
  });

  socket.connect(() => {
    // console.log(`connected ${socket.id}`);
  });

  return () => {
    socket.disconnect(() => {
      // console.log('disconnected');
    });
  };
};
