import axios from 'axios';
import {
  getUser, signInSueccess, signOutSueccess, signUpSueccess,
} from './actions';

export const signinUser = ({ username, password }) => (dispatch) => {
  axios
    .post('/api/auth/login/', {
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
  let signUpData;
  axios
    .post('/api/auth/signup/', {
      username, email, password1: password, password2: password,
    })
    .then((res) => {
      signUpData = res.data;
      axios
        .post('/api/profile/', { id: signUpData.user.pk })
        .then((resData) => {
          // eslint-disable-next-line no-console
          console.log(resData.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      dispatch(signUpSueccess());
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const signOutUser = () => (dispatch) => {
  axios
    .post('/api/auth/logout/', null)
    .then(() => {
      dispatch(signOutSueccess());
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const fetechedUser = () => (dispatch) => {
  axios
    .get('/api/auth/user/', {
      headers: { Cookie: `access_token=${localStorage.getItem('access_token')}` },
    })
    .then((res) => {
      dispatch(getUser(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
