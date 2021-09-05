import axios from 'axios';
import { getLeaders, getLeadersStats } from './actions';

export const fetechedLeaders = () => (dispatch) => {
  axios
    .get('/api/profile/leaderboard/')
    .then((res) => {
      dispatch(getLeaders(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const fetechedLeaderStats = (username) => (dispatch) => {
  axios
    .get(`/api/users/account/${username}`)
    .then((res) => {
      dispatch(getLeadersStats(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
