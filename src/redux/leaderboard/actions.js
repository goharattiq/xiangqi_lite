/* eslint-disable import/prefer-default-export */
import { GET_LEADERS, GET_LEADERS_STATS } from './type';

export const getLeaders = (data) => ({
  type: GET_LEADERS,
  payload: data,
});

export const getLeadersStats = (data) => ({
  type: GET_LEADERS_STATS,
  payload: data,
});
