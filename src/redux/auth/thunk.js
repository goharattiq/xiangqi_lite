/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { signInSueccess, signUpSueccess } from './actions';

export const signinUser = ({ email, password }) => (dispatch) => {
  const locale = navigator.language.slice(0, 2);
  axios
    .post('/api/users/signin', {
      email, password, locale,
    })
    .then((res) => {
      // console.log(res.data);
      dispatch(signInSueccess(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const signupUser = ({ username, email, password }) => (dispatch) => {
  const locale = navigator.language.slice(0, 2);
  axios
    .post('/api/users/signup', {
      username, email, password, locale,
    })
    .then((res) => {
      dispatch(signUpSueccess(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
