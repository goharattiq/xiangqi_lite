/* eslint-disable import/prefer-default-export */
import {
  INIT_BOARD,
  PIECE_MOVE,
} from './type';

export const initBoard = () => ({
  type: INIT_BOARD,
});

export const pieceMove = (move) => ({
  type: PIECE_MOVE,
  payload: move,
});
