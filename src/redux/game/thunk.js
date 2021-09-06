import axios from 'axios';
import { dispatchErrors } from '../toast/utils';
import { activeGames, searchUsername, spectateGames } from './actions';

export const fetechedSearchUsernames = (queryString) => (dispatch) => {
  axios
    .get(`/api/profile/search/${queryString}/`)
    .then((res) => {
      dispatch(searchUsername(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechedActiveGames = () => (dispatch) => {
  axios
    .get('/api/game/active/')
    .then((res) => {
      dispatch(activeGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechedSpectateGames = () => (dispatch) => {
  axios
    .get('/api/game/spectate/')
    .then((res) => {
      dispatch(spectateGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
