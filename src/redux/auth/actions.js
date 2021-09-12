import {
  GET_USER,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from './type';

export const signInSueccess = (data) => ({
  type: SIGNIN_SUCCESS,
  payload: data,
});

export const signUpSueccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const signOutSueccess = () => ({
  type: SIGNOUT_SUCCESS,
});

export const getUser = (data) => ({
  type: GET_USER,
  payload: data,
});
