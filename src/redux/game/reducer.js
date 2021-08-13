import {
  INIT_BOARD,
} from './type';
import { initMatrix } from './utiles';

const initialState = {
  board: initMatrix(10, 9),
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default gameReducer;
