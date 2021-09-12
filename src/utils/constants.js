export const GAME_TYPE = ['Public', 'Private'];
export const GAME_RATED = ['Rated', 'Unrated'];
export const GAME_TIMED = ['Timed', 'Nontimed'];
export const MOVE_TIMER = ['1', '2', '5', '10'];
export const GAME_TIMER = {
  1: ['5', '10', '20', '30', '60'],
  2: ['10', '20', '30', '60'],
  5: ['20', '30', '60'],
  10: ['30', '60'],
};
export const SIDE = ['Red', 'Random', 'Black'];
export const MAP = {
  p: 'Pawn',
  r: 'Chariot',
  h: 'Horse',
  e: 'Elephant',
  a: 'Advisor',
  k: 'King',
  c: 'Cannon',
};

export const NORTH = 'NORTH';
export const SOUTH = 'SOUTH';
export const EAST = 'EAST';
export const WEST = 'WEST';

export const RED = 1;
export const BLACK = 0;

export const ROWS = 10;
export const COLS = 9;

export const TOAST_TIMER = 5000;

const WS_SCHEME = window.location.protocol === 'https:' ? 'wss' : 'ws';
export const SOCKET_URL = `${WS_SCHEME}://${window.location.host}`;
