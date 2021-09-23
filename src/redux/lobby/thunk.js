import axios from 'axios';

import { GAME_BASE_PATH } from '../../utilis/constants';
import { dispatchErrors } from '../toast/utilis';
import { activeGames, spectateGames } from './actions';

export const fetechActiveGames = () => (dispatch) => {
  axios
    .get(`${GAME_BASE_PATH}/active/`)
    .then((res) => {
      dispatch(activeGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};

export const fetechSpectateGames = () => (dispatch) => {
  axios
    .get(`${GAME_BASE_PATH}/spectate/`)
    .then((res) => {
      dispatch(spectateGames(res.data));
    })
    .catch((err) => {
      const errors = err.response.data;
      dispatchErrors(errors, dispatch);
    });
};
