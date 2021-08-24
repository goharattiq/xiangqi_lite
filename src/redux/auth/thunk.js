import axios from 'axios';
import { signInSueccess, signOutSueccess, signUpSueccess } from './actions';

export const signinUser = ({ username, password }) => (dispatch) => {
  axios
    .post('/api/accounts/signin/', {
      username, password,
    })
    .then((res) => {
      dispatch(signInSueccess(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const signupUser = ({ username, email, password }) => (dispatch) => {
  axios
    .post('/api/accounts/signup/', {
      username, email, password,
    })
    .then((res) => {
      // eslint-disable-next-line
      console.log(res);
      dispatch(signUpSueccess());
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const signOutUser = (token) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .post('/api/accounts/signout/', null, config)
    .then(() => {
      dispatch(signOutSueccess());
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
