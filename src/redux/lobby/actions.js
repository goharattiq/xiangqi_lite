import { ACTIVE_GAMES, SPECTATE_GAMES } from './type';

export const activeGames = (games) => ({
  type: ACTIVE_GAMES,
  payload: games,
});

export const spectateGames = (games) => ({
  type: SPECTATE_GAMES,
  payload: games,
});
