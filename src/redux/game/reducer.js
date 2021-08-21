/* eslint-disable no-case-declarations */
import {
  CLEAR_HINT_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  INIT_BOARD,
  PIECE_MOVE,
  SET_GAME_PARAMS,
} from './type';
import { initMatrix, onPieceMove } from './utiles';
import { getHintMoves } from '../../utils/game';
import { COLS, ROWS } from '../../utils/constants';

const initialState = {
  board: initMatrix(ROWS, COLS),
  hints: [],
  hitPiece: [],
  history: [],
  params: null,
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INIT_BOARD:
      return {
        ...state,
        board: initMatrix(ROWS, COLS),
      };
    case PIECE_MOVE:
      const { board, hitPiece, history } = onPieceMove(payload, state, { mode: false });
      return {
        ...state,
        board,
        hitPiece: [...state.hitPiece, hitPiece].filter((piece) => (piece !== null)),
        history: [...state.history, history].filter((back) => (back !== null)),
      };
    case HINT_MOVE:
      const { pieceName, location } = payload;
      return {
        ...state,
        hints: getHintMoves(pieceName, location, state.board),
      };
    case CLEAR_HINT_MOVE:
      return {
        ...state,
        hints: [],
      };
    case HISTORY_MOVE_BACK:
      const historyBack = onPieceMove(payload, state, { mode: true, type: HISTORY_MOVE_BACK });
      return {
        ...state,
        board: historyBack.board,
      };

    case HISTORY_MOVE_FORWARD:
      const historyFor = onPieceMove(payload, state, { mode: true, type: HISTORY_MOVE_FORWARD });
      return {
        ...state,
        board: historyFor.board,
      };
    case SET_GAME_PARAMS:
      return {
        ...state,
        params: payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
