import {
  INIT_BOARD,
  PIECE_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  CLEAR_HINT_MOVE,
  SET_GAME_PARAMS,
  PLAYER_TURN,
} from './type';

export const initBoard = (board, hitPiece, history) => ({
  type: INIT_BOARD,
  payload: { board, hitPiece, history },
});

export const pieceMove = (move, fromSockets) => ({
  type: PIECE_MOVE,
  payload: { move, fromSockets },
});

export const hintMove = (pieceName, location) => ({
  type: HINT_MOVE,
  payload: { pieceName, location },
});

export const clearHintMove = () => ({
  type: CLEAR_HINT_MOVE,
});

export const historyMoveBack = (move) => ({
  type: HISTORY_MOVE_BACK,
  payload: move,
});

export const historyMoveForward = (move) => ({
  type: HISTORY_MOVE_FORWARD,
  payload: move,
});

export const gameParamsAct = (params) => ({
  type: SET_GAME_PARAMS,
  payload: params,
});

export const playerTurn = (changePlayerTurn) => ({
  type: PLAYER_TURN,
  payload: changePlayerTurn,
});
