import axios from 'axios';

import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utils';
import { editProfile, getGames, getProfile } from './actions';

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

export const fetchAllTimeGames = (userID) => (dispatch) => {
  axios
    .get(`/api/game/alltime/${userID}/`)
    .then((res) => {
      dispatch(getGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const updateProfile = (userID, {
// eslint-disable-next-line camelcase
  first_name, last_name, bio, photo,
}, history) => (dispatch) => {
  const data = new FormData();
  data.append('photo', photo);
  data.append('id', userID);
  data.append('first_name', first_name);
  data.append('last_name', last_name);
  data.append('bio', bio);
  axios
    .put(`/api/profile/${userID}/`, data)
    .then((res) => {
      dispatch(editProfile(res.data));
      dispatch(setToast('Profile Edit SuccessFully', 'light', dispatch));
      history.push('/profile');
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
