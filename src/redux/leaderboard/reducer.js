import { GET_LEADERS, GET_LEADERS_STATS } from './type';
import { attachStats } from './utils';

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
    case GET_LEADERS_STATS:
      return {
        ...state,
        stats: { ...state.stats, ...attachStats(action.payload, state.leaders) },
      };
    default:
      return state;
  }
};

export default leaderReducer;
