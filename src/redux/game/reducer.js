import {
  HINT_MOVE,
  INIT_BOARD,
  PIECE_MOVE,
} from './type';
import { initMatrix, onPieceMove } from './utiles';

const initialState = {
  board: initMatrix(10, 9),
  hints: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        ...state,
      };
    case PIECE_MOVE:
      return {
        ...state,
        board: onPieceMove(action.payload, state),
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
