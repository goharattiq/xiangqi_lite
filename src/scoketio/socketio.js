/* eslint-disable camelcase */
import { io } from 'socket.io-client';
import { clearHintMove, initBoard, pieceMove } from '../redux/game/actions';
import { SOCKET_URL } from '../utils/constants';

let socket;

export const useSockets = (
  accessToken, setGameParams, history, username, dispatch,
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

  socket.on('game.send_params', (gameParams) => {
    initGame(setGameParams, history, gameParams, username, dispatch);
  });

  socket.on('game.success', (gameParams) => {
    initGame(setGameParams, history, gameParams);
  });

  socket.on('game.move_success', (move) => {
    dispatch(pieceMove(move, true));
    dispatch(clearHintMove());
  });

  return () => {
    socket.disconnect(() => {
      // console.log('disconnected');
    });
  };
};

export const socketSetGameParams = (params) => {
  socket.emit('game.set_params', {
    ...params,
    player_1: 2,
    player_2: 3,
  });
};

const initGame = (setGameParams, history, gameParams, username, dispatch) => {
  // eslint-disable-next-line prefer-const
  let { game_board, ...newGameParams } = gameParams;
  dispatch(initBoard(game_board));
  newGameParams.side = newGameParams.side === 'Random' ? ['Red', 'Black'][Math.round(Math.random())] : newGameParams.side;

  if (newGameParams.player_name_2 === username) {
    newGameParams = {
      ...newGameParams,
      side: newGameParams.side === 'Red' ? 'Black' : 'Red',
    };
  }
  setGameParams(newGameParams);
  history.push(`/game/${newGameParams.id}`);
};
