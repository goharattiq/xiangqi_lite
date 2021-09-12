import { ACTIVE_GAMES, SPECTATE_GAMES } from './type';

const initialState = {
  activeGames: null,
  spectateGames: null,
};

const lobbyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIVE_GAMES:
      return {
        ...state,
        activeGames: payload,
      };

    case SPECTATE_GAMES:
      return {
        ...state,
        spectateGames: payload,
      };
    default:
      return state;
  }
};

export default lobbyReducer;
