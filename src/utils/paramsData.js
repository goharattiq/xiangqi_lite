/* eslint-disable import/prefer-default-export */
import {
  GAME_TYPE, GAME_RATED, GAME_TIMED,
} from './constants';

export const PARAMETERS = [
  {
    data: GAME_TYPE,
    name: 'gameType',
    type: 'radio',
    id: 'game-type',
    className: 'text-center radio-buttons',
  },
  {
    data: GAME_RATED,
    name: 'gameRated',
    type: 'radio',
    id: 'game-rated',
    className: 'text-center radio-buttons',
  },
  {
    data: GAME_TIMED,
    name: 'gameTimed',
    type: 'radio',
    id: 'game-timed',
    className: 'text-center radio-buttons',
  },
];
