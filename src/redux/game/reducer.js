import {
  HINT_MOVE,
  INIT_BOARD,
  PIECE_MOVE,
} from './type';
import { initMatrix, onPieceMove } from './utiles';

const initialState = {
  board: initMatrix(10, 9),
  hints: [],
  hitPiece: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        ...state,
      };
    case PIECE_MOVE:
      // eslint-disable-next-line no-case-declarations
      const { board, hitPiece } = onPieceMove(action.payload, state);
      return {
        ...state,
        board,
        hitPiece: [...state.hitPiece, hitPiece].filter((piece) => (piece !== null)),
      };
    case HINT_MOVE:
      return {
        ...state,
        hints: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
