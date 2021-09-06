/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import {
  clearGame,
  announceWinner,
  clearHintMove,
  initBoard,
  pieceMove,
} from '../redux/game/actions';
import { initMatrix } from '../utils/game';
import { COLS, ROWS } from '../utils/constants';
import { socket } from './socketio';

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

export const socketEndGame = (gameID, players, looser, type, isRated) => {
  socket.emit('game.end', {
    gameID,
    players,
    looser,
    type,
    isRated,
  });
};

export const socketLeaveGame = (gameID, dispatch) => {
  socket.emit('game.leave', gameID);
  dispatch(clearGame());
};

export const subscribeGameSockets = (history, username, dispatch) => {
  if (socket) {
    socket.on('game.send_params', (gameParams) => {
      history.location.pathname !== `/game/${gameParams.id}` && history.push(`/game/${gameParams.id}`);
      initGame(gameParams, username, dispatch);
    });

    socket.on('game.success', (gameParams) => {
      history.location.pathname !== `/game/${gameParams.id}` && history.push(`/game/${gameParams.id}`);
      initGame(gameParams, username, dispatch);
    });

    socket.on('game.move_success', (data) => {
      dispatch(pieceMove(data.move, true));
      dispatch(clearHintMove());
    });

    socket.on('game.announce_winner', (winner) => {
      dispatch(announceWinner(winner));
    });
  }
};

const initGame = (gameParams, username, dispatch) => {
  let {
    // eslint-disable-next-line prefer-const
    game_board, hit_pieces, history, ...newGameParams
  } = gameParams;

  if (newGameParams.player_2.user.username === username) {
    newGameParams = {
      ...newGameParams,
      side: newGameParams.side === 'Red' ? 'Black' : 'Red',
    };
  }
  dispatch(initBoard(game_board, hit_pieces, history, newGameParams));
};
