/* eslint-disable import/prefer-default-export */
import {
  INIT_BOARD,
  PIECE_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
} from './type';

export const initBoard = () => ({
  type: INIT_BOARD,
});

export const pieceMove = (move) => ({
  type: PIECE_MOVE,
  payload: move,
});

export const hintMove = (hints) => ({
  type: HINT_MOVE,
  payload: hints,
});

export const historyMoveBack = (move) => ({
  type: HISTORY_MOVE_BACK,
  payload: move,
});

export const historyMoveForward = (move) => ({
  type: HISTORY_MOVE_FORWARD,
  payload: move,
});
