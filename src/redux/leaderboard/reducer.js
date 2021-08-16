import { GET_LEADERS } from './type';

const initialState = null;

const leaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default leaderReducer;
