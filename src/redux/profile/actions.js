/* eslint-disable import/prefer-default-export */
import {
  GET_PROFILE,
} from './type';

export const getProfile = (data) => ({
  type: GET_PROFILE,
  payload: data,
});
