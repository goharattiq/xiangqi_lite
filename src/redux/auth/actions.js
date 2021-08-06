/* eslint-disable import/prefer-default-export */
import {
  SIGNIN_SUCCESS,
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
