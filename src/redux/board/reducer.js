import {
  INIT_BOARD,
} from './type';

const initialState = [10][9];

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
