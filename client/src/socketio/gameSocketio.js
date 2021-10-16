/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { clearChat } from '../redux/chat/actions';
import {
  clearGame,
  announceWinner,
  clearHintMove,
  initBoard,
  pieceMove,
  waitTimer,
} from '../redux/game/actions';
// eslint-disable-next-line import/no-cycle
import store from '../redux/store';
import { setToast } from '../redux/toast/actions';
import {
  BLACK, numCols, numRows, RANDOM, RED,
} from '../utilis/constants';
import {
  boardOptimize, initMatrix, loadBoard, setPiecePositions,
} from '../utilis/game';
import history from '../utilis/history';
import {
  DISCONNECT,
  GAME_CREATE,
  GAME_END,
  GAME_ENTER,
  GAME_LEAVE,
  GAME_MAKE_MOVE,
  GAME_MOVE_SUCCESS,
  GAME_SEND_PARAMS,
  GAME_SUCCESSFULLY_CREATED,
  GAME_WINNER_ANNOUNCE,
  NOTIFICATION_GAME_CREATED,
  NOTIFICATION_PLAYERS_READY,
  NOTIFICATION_PLAYER_LEAVE,
} from './constants';
import { socket } from './socketio';

export const socketEnterGame = (gameID) => {
  if (!socket) {
    history.push('/lobby');
    return;
  }
  socket.emit(GAME_ENTER, gameID);
};

export const socketSetGameParams = (params, owner) => {
  const newParams = params;
  newParams.side = newParams.side === RANDOM
    ? [RED, BLACK][Math.round(Math.random())] : newParams.side;
  let board = initMatrix(numRows, numCols);
  board = setPiecePositions(board);
  socket.emit(GAME_CREATE, {
    ...newParams,
    game_board: boardOptimize(board),
    player_1: owner,
    player_2: params.username !== '' ? params.username : null,
  });
};

export const socketSendMoves = (game_id, move, board) => {
  socket.emit(GAME_MAKE_MOVE, {
    game_id,
    move,
    game_board: boardOptimize(board),
  });
};

export const socketEndGame = (game_id, players, looser, type, isRated) => {
  socket.emit(GAME_END, {
    game_id,
    players,
    looser,
    type,
    isRated,
  });
};

export const socketLeaveGame = (game_id) => (dispatch) => {
  localStorage.removeItem('gameID');
  socket.emit(GAME_LEAVE, game_id);
  dispatch(clearGame());
  dispatch(clearChat());
};

export const subscribeGameSocketEvents = () => (dispatch) => {
  const { auth } = store.getState();
  const { username } = auth.user;
  if (socket) {
    socket.on(GAME_SEND_PARAMS, (gameParams) => {
      initGame(gameParams, dispatch);
      dispatch(waitTimer(true));
    });

    socket.on(GAME_SUCCESSFULLY_CREATED, (gameParams) => {
      initGame(gameParams, dispatch);
      history.location.pathname !== `/game/${gameParams.id}` && history.push(`/game/${gameParams.id}`);
    });

    socket.on(GAME_MOVE_SUCCESS, (data) => {
      dispatch(pieceMove(data.move, true, data.player_1, data.player_2, data.playerTurn));
      dispatch(clearHintMove());
    });

    socket.on(GAME_WINNER_ANNOUNCE, (winner) => {
      dispatch(announceWinner(winner));
    });

    socket.on(NOTIFICATION_GAME_CREATED, (data) => {
      dispatch(setToast('Game Create Successfully', 'light', data));
    });

    socket.on(NOTIFICATION_PLAYERS_READY, (data) => {
      if (username === data.creator || username === data.invitee) {
        dispatch(setToast('Opposition join the game', 'light'));
      }
    });

    socket.on(NOTIFICATION_PLAYER_LEAVE, (data) => {
      if (username === data.creator || username === data.invitee) {
        dispatch(setToast('Opposition leave the game', 'light'));
      }
    });

    socket.on(DISCONNECT, () => {
      dispatch(socketLeaveGame(localStorage.getItem('gameID')));
    });
  }
};

const initGame = (gameParams, dispatch) => {
  let {
    // eslint-disable-next-line prefer-const
    game_board, hit_pieces, history, ...newGameParams
  } = gameParams;
  game_board = loadBoard(game_board);
  dispatch(initBoard(game_board, hit_pieces, history, newGameParams));
};
