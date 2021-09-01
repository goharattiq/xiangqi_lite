/* eslint-disable camelcase */
import { io } from 'socket.io-client';
import {
  clearHintMove, initBoard, pieceMove,
} from '../redux/game/actions';
import { initMatrix } from '../utils/game';
import { COLS, ROWS, SOCKET_URL } from '../utils/constants';

let socket;

export const useSockets = (
  accessToken, setGameParams, history, username, dispatch,
) => {
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
    initGame(setGameParams, history, gameParams, username, dispatch);
  });

  socket.on('game.move_success', (data) => {
    // dispatch(playerTurn(data.playerTurn));
    dispatch(pieceMove(data.move, true));
    dispatch(clearHintMove());
  });

  socket.on('connect_error', () => {
    socket.disconnect();
  });

  return () => {
    socket.disconnect(() => {
      // console.log('disconnected');
    });
  };
};

export const socketEnterGame = (gameID) => {
  socket.emit('game.enter', gameID);
};

export const socketSetGameParams = (params, owner) => {
  const newParams = params;
  newParams.side = newParams.side === 'Random' ? ['Red', 'Black'][Math.round(Math.random())] : newParams.side;
  socket.emit('game.set_params', {
    ...newParams,
    game_board: initMatrix(ROWS, COLS),
    player_1: owner,
    player_2: params.username,
  });
};

export const socketSendMoves = (gameID, move, board) => {
  socket.emit('game.piece_move', {
    gameID,
    move,
    board,
  });
};

const initGame = (setGameParams, historyUrl, gameParams, username, dispatch) => {
  let {
    // eslint-disable-next-line prefer-const
    game_board, hit_pieces, history, ...newGameParams
  } = gameParams;
  dispatch(initBoard(game_board, hit_pieces, history));

  if (newGameParams.player_2.user.username === username) {
    newGameParams = {
      ...newGameParams,
      side: newGameParams.side === 'Red' ? 'Black' : 'Red',
    };
  }
  setGameParams(newGameParams);
  historyUrl.push(`/game/${newGameParams.id}`);
};
