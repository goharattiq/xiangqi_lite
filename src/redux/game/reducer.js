import {
  INIT_BOARD, PIECE_MOVE,
} from './type';
import { initMatrix, onPieceMove } from './utiles';

const initialState = {
  board: initMatrix(10, 9),
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

    default:
      return state;
  }
};

export default gameReducer;
