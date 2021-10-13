import {
  CLEAR_PROFILE, EDIT_PROFILE, GET_ALLTIME_GAMES, GET_PROFILE,
} from './type';

export const getProfile = (data) => ({
  type: GET_PROFILE,
  payload: data,
});

export const getGames = (data) => ({
  type: GET_ALLTIME_GAMES,
  payload: data,
});

export const editProfile = (data) => ({
  type: EDIT_PROFILE,
  payload: data,
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});
