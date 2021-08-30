import axios from 'axios';
import { activeGames, searchUsername, spectateGames } from './actions';

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

export const fetechedActiveGames = () => (dispatch) => {
  axios
    .get('/api/game/my_game/')
    .then((res) => {
      dispatch(activeGames(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export const fetechedSpectateGames = () => (dispatch) => {
  axios
    .get('/api/game/spectate/')
    .then((res) => {
      dispatch(spectateGames(res.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
