import axios from 'axios';
import {
  getUser, signInSueccess, signOutSueccess, signUpSueccess,
} from './actions';
import { setToast } from '../toast/actions';
import { dispatchErrors } from '../toast/utils';

export const signinUser = ({ username, password }) => (dispatch) => {
  axios
    .post('/api/auth/login/', {
      username, password,
    })
    .then((res) => {
      dispatch(signInSueccess(res.data));
      dispatch(setToast('Signin Successfully', 'light'));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
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
          dispatch(setToast('User Created Successfully', 'light'));
        })
        .catch((err) => {
          const errors = err.response.data;
          dispatchErrors(errors, dispatch);
        });
      dispatch(signUpSueccess());
      dispatch(setToast('Sigup Successfully', 'light'));
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
      dispatch(setToast('Logout Successfully', 'light'));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechedUser = () => (dispatch) => {
  axios
    .get('/api/auth/user/')
    .then((res) => {
      dispatch(getUser(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
