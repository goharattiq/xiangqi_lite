/* eslint-disable import/prefer-default-export */
import { SGININ_SUCCESS } from './type';

export const signInSueccess = (user) => ({
  type: SGININ_SUCCESS,
  payload: user,
});
