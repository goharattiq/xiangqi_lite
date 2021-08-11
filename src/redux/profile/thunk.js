/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getProfile } from './actions';

export const fetchUserProfile = (username) => (dispatch) => {
  axios
    .get(`/api/users/account/${username}`)
    .then((res) => {
      dispatch(getProfile(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
