/* eslint-disable camelcase */
import { clearChat } from '../redux/chat/actions';
import {
  clearGame,
  announceWinner,
  clearHintMove,
  initBoard,
  pieceMove,
} from '../redux/game/actions';
import { COLS, ROWS } from '../utils/constants';
import {
  boardOptimize, initMatrix, loadBoard, setPiecePositions,
} from '../utils/game';
import { socket } from './socketio';

export const socketEnterGame = (gameID, history) => {
  if (!socket) {
    history.push('/lobby');
    return;
  }
  socket.emit('game.enter', gameID);
};

export const socketSetGameParams = (params, owner) => {
  const newParams = params;
  newParams.side = newParams.side === 'Random' ? ['Red', 'Black'][Math.round(Math.random())] : newParams.side;
  let board = initMatrix(ROWS, COLS);
  board = setPiecePositions(board);
  socket.emit('game.set_params', {
    ...newParams,
    game_board: boardOptimize(board),
    player_1: owner,
    player_2: params.username,
  });
};

export const socketSendMoves = (gameID, move, board) => {
  socket.emit('game.piece_move', {
    gameID,
    move,
    board: boardOptimize(board),
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
  localStorage.removeItem('gameID');
  socket.emit('game.leave', gameID);
  dispatch(clearGame());
  dispatch(clearChat());
};

export const subscribeGameSockets = (history, username, dispatch) => {
  if (socket) {
    socket.on('game.send_params', (gameParams) => {
      initGame(gameParams, username, dispatch);
    });

    socket.on('game.success', (gameParams) => {
      initGame(gameParams, username, dispatch);
      history.location.pathname !== `/game/${gameParams.id}` && history.push(`/game/${gameParams.id}`);
    });

    socket.on('game.move_success', (data) => {
      dispatch(pieceMove(data.move, true));
      dispatch(clearHintMove());
    });

    socket.on('game.announce_winner', (winner) => {
      dispatch(announceWinner(winner));
    });
    socket.on('disconnect', () => {
      socketLeaveGame(localStorage.getItem('gameID'), dispatch);
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
  game_board = loadBoard(game_board);
  dispatch(initBoard(game_board, hit_pieces, history, newGameParams));
};
