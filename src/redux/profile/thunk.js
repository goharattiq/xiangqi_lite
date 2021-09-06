/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { dispatchErrors } from '../toast/utils';
import { getGames, getProfile } from './actions';

export const fetchUserProfile = (userId) => (dispatch) => {
  axios
    .get(`/api/profile/${userId}/`)
    .then((res) => {
      dispatch(getProfile(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetchAllTimeGames = () => (dispatch) => {
  axios
    .get('/api/game/alltime/')
    .then((res) => {
      dispatch(getGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
