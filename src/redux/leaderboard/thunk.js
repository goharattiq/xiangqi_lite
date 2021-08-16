/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getLeaders } from './actions';

export const fetechedLeaders = () => (dispatch) => {
  axios
    .get('/api/leader_board/leaders')
    .then((res) => {
      dispatch(getLeaders(res.data.data.top_leaders));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
