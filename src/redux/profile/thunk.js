import axios from 'axios';

import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utils';
import { editProfile, getGames, getProfile } from './actions';

export const fetchUserProfile = (username) => (dispatch) => {
  axios
    .get(`/api/profile/${username}/`)
    .then((res) => {
      dispatch(getProfile(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetchAllTimeGames = (username) => (dispatch) => {
  axios
    .get(`/api/game/alltime/${username}/`)
    .then((res) => {
      dispatch(getGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const updateProfile = (username, {
// eslint-disable-next-line camelcase
  first_name, last_name, bio, photo,
}, history) => (dispatch) => {
  const data = new FormData();
  data.append('photo', photo);
  data.append('first_name', first_name);
  data.append('last_name', last_name);
  data.append('bio', bio);
  axios
    .put(`/api/profile/${username}/`, data)
    .then((res) => {
      dispatch(editProfile(res.data));
      dispatch(setToast('Profile Edit SuccessFully', 'light', dispatch));
      history.push(`/profile/${username}`);
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
      history.push('/lobby');
    });
};
