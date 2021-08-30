/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getProfile } from './actions';

export const fetchUserProfile = (userId) => (dispatch) => {
  axios
    .get(`/api/profile/${userId}`)
    .then((res) => {
      dispatch(getProfile(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
