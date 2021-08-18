/* eslint-disable no-case-declarations */
import {
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  INIT_BOARD,
  PIECE_MOVE,
} from './type';
import { initMatrix, onPieceMove } from './utiles';

const initialState = {
  board: initMatrix(10, 9),
  hints: [],
  hitPiece: [],
  history: [],
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INIT_BOARD:
      return {
        ...state,
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
      return {
        ...state,
        hints: payload,
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

    default:
      return state;
  }
};

export default gameReducer;
