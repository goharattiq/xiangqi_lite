import axios from 'axios';

import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utils';
import {
  getUser,
  signInSueccess,
  signOutSueccess,
  signUpSueccess,
} from './actions';

export const signinUser = ({ username, password }) => (dispatch) => {
  axios
    .post('/api/auth/login/', {
      username, password,
    })
    .then((res) => {
      dispatch(signInSueccess(res.data));
      dispatch(setToast('Signin Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const signupUser = ({ username, email, password }) => (dispatch) => {
  axios
    .post('/api/auth/signup/', {
      username, email, password1: password, password2: password,
    }, {
      withCredentials: false,
    })
    .then(() => {
      dispatch(signUpSueccess());
      dispatch(setToast('Sigup Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const signOutUser = () => (dispatch) => {
  axios
    .post('/api/auth/logout/', null)
    .then(() => {
      dispatch(signOutSueccess());
      dispatch(setToast('Logout Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechedUser = () => (dispatch) => {
  dispatch(getUser({}));
  axios
    .get('/api/auth/user/')
    .then((res) => {
      dispatch(getUser(res.data));
    })
    .catch((err) => {
      dispatch(getUser(null));
      localStorage.removeItem('access_token');
      const errors = err.response?.data;
      dispatchErrors(errors, dispatch);
    });
};
