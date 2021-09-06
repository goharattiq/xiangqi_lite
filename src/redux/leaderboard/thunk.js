import axios from 'axios';
import { dispatchErrors } from '../toast/utils';
import { getLeaders } from './actions';

export const fetechedLeaders = () => (dispatch) => {
  axios
    .get('/api/profile/leaderboard/')
    .then((res) => {
      dispatch(getLeaders(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
