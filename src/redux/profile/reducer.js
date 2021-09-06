import { GET_ALLTIME_GAMES, GET_PROFILE } from './type';

const initialState = {
  games: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ALLTIME_GAMES:
      return {
        ...state,
        games: [...action.payload],
      };
    default:
      return state;
  }
};

export default profileReducer;
