import {
  GAME_TYPE,
  GAME_RATED,
  GAME_TIMED,
  RADIO,
  RADIO_STYLE,
} from './constants';

const objectParameter = (data, name, type, id, className, checkField) => ({
  data,
  name,
  type,
  id,
  className,
  checkField,
});

export const GAME_PARAMETERS = [
  objectParameter(GAME_TYPE, 'gameType', RADIO, 'game-type', RADIO_STYLE, 'game-type-0'),
  objectParameter(GAME_RATED, 'gameRated', RADIO, 'game-rated', RADIO_STYLE, 'game-rated-0'),
  objectParameter(GAME_TIMED, 'gameTimed', RADIO, 'game-timed', RADIO_STYLE, 'game-timed-0'),
];
