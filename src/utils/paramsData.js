import { GAME_TYPE, GAME_RATED, GAME_TIMED } from './constants';

export const PARAMETERS = [
  {
    data: GAME_TYPE,
    name: 'gameType',
    type: 'radio',
    id: 'game-type',
    className: 'text-center radio-buttons',
    checkField: 'game-type-0',
  },
  {
    data: GAME_RATED,
    name: 'gameRated',
    type: 'radio',
    id: 'game-rated',
    className: 'text-center radio-buttons',
    checkField: 'game-rated-0',
  },
  {
    data: GAME_TIMED,
    name: 'gameTimed',
    type: 'radio',
    id: 'game-timed',
    className: 'text-center radio-buttons',
    checkField: 'game-timed-0',
  },
];