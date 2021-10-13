import axios from 'axios';

import { PROFILE_BASE_PATH } from '../../utilis/constants';
import { dispatchErrors } from '../toast/utilis';
import { searchUsername } from './actions';

export const fetechSearchUserNames = (queryString) => (dispatch) => {
  axios
    .get(`${PROFILE_BASE_PATH}/search/?username=${queryString}`)
    .then((res) => {
      dispatch(searchUsername(res.data));
    })
    .catch((err) => {
      const errors = err.response?.data;
      dispatchErrors(errors, dispatch);
    });
};
