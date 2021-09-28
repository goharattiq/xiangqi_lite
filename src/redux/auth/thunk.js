import axios from 'axios';

import { AUTH_BASE_PATH } from '../../utilis/constants';
import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utilis';
import {
  getUser,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
} from './actions';

export const signinUser = (credentials) => (dispatch) => {
  const { username, password } = credentials;
  axios
    .post(`${AUTH_BASE_PATH}/login/`, {
      username, password,
    })
    .then((res) => {
      dispatch(signInSuccess(res.data));
      dispatch(setToast('Signin Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const signupUser = ({ username, email, password }) => (dispatch) => {
  axios
    .post(`${AUTH_BASE_PATH}/signup/`, {
      username, email, password1: password, password2: password,
    }, {
      withCredentials: false,
    })
    .then(() => {
      dispatch(signUpSuccess());
      dispatch(setToast('Sigup Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const signOutUser = () => (dispatch) => {
  axios
    .post(`${AUTH_BASE_PATH}/logout/`, null)
    .then(() => {
      dispatch(signOutSuccess());
      dispatch(setToast('Logout Successfully', 'light', dispatch));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechUser = () => (dispatch) => {
  dispatch(getUser({}));
  axios
    .get(`${AUTH_BASE_PATH}/user/`)
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
