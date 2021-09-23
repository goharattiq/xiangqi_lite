import axios from 'axios';

import { PROFILE_BASE_PATH } from '../../utilis/constants';
import { dispatchErrors } from '../toast/utilis';
import { getLeaders } from './actions';

export const fetechLeaders = () => (dispatch) => {
  axios
    .get(`${PROFILE_BASE_PATH}/leaderboard/`)
    .then((res) => {
      dispatch(getLeaders(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
