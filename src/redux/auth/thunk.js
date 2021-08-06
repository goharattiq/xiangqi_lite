/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BASE_URL } from '../constants';
import { signInSueccess } from './actions';

export const signinUser = ({ email, password }) => (dispatch) => {
  axios
    .post(`${BASE_URL}/api/users/signin`, { email, password, locale: 'en' })
    .then(async (res) => {
      dispatch(signInSueccess(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
