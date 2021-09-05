/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getGames, getProfile } from './actions';

export const fetchUserProfile = (userId) => (dispatch) => {
  axios
    .get(`/api/profile/${userId}/`)
    .then((res) => {
      dispatch(getProfile(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const fetchAllTimeGames = () => (dispatch) => {
  axios
    .get('/api/game/alltime/')
    .then((res) => {
      dispatch(getGames(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
