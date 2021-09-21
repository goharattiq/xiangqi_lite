import axios from 'axios';

import { dispatchErrors } from '../toast/utils';
import { searchUsername } from './actions';

export const fetechedSearchUsernames = (queryString) => (dispatch) => {
  axios
    .get(`/api/profile/search/?username=${queryString}`)
    .then((res) => {
      dispatch(searchUsername(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
