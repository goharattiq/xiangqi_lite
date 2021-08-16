/* eslint-disable import/prefer-default-export */
import { GET_LEADERS } from './type';

export const getLeaders = (data) => ({
  type: GET_LEADERS,
  payload: data,
});
