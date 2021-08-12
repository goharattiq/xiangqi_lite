import {
  INIT_BOARD,
} from './type';
import { initMatrix } from './utiles';

const initialState = initMatrix(10, 9);

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default boardReducer;
