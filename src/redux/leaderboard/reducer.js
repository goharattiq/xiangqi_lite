import { GET_LEADERS } from './type';

const initialState = {
  leaders: [],
  stats: null,

};

const leaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERS:
      return {
        ...state,
        leaders: [...action.payload],
      };
    default:
      return state;
  }
};

export default leaderReducer;
