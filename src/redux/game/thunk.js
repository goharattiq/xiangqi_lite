import axios from 'axios';
import { searchUsername } from './actions';

export const fetechedSearchUsernames = (queryString) => (dispatch) => {
  axios
    .get(`/api/profile/search/${queryString}`)
    .then((res) => {
      dispatch(searchUsername(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
