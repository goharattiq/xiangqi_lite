import axios from 'axios';

import { GAME_BASE_PATH, PROFILE_BASE_PATH } from '../../utilis/constants';
import history from '../../utilis/history';
import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utilis';
import { editProfile, getGames, getProfile } from './actions';

export const fetchUserProfile = (username) => (dispatch) => {
  axios
    .get(`${PROFILE_BASE_PATH}/${username}/`)
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
    .get(`${GAME_BASE_PATH}/alltime/${username}/`)
    .then((res) => {
      dispatch(getGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const updateProfile = (username, updatedProfile) => (dispatch) => {
  const data = new FormData();
  Object.entries(updatedProfile).forEach(([name, value]) => {
    if (value) {
      data.append(name, value);
    }
  });
  axios
    .put(`${PROFILE_BASE_PATH}/${username}/`, data)
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
