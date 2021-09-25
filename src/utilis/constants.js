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
export const PIECE_MAP = {
  p: 'Pawn',
  r: 'Chariot',
  h: 'Horse',
  e: 'Elephant',
  a: 'Advisor',
  k: 'King',
  c: 'Cannon',
};

export const SIGNIN = 'signin';
export const SIGNUP = 'signup';

export const UP = 'UP';
export const DOWN = 'DOWN';
export const RIGHT = 'EAST';
export const LEFT = 'LEFT';

export const RED = 'Red';
export const BLACK = 'Black';
export const RANDOM = 'Random';

export const numRows = 10;
export const numCols = 9;

export const TOAST_TIMEOUT_SECONDS = 5;
export const GAME_RESTART_TIMEOUT_MINUTES = 3;

export const ALLOWED_EXTENSTIONS = [
  'JPEG', 'JPG', 'PNG',
];

export const RADIO = 'radio';
export const RADIO_STYLE = 'text-center radio-buttons';

const API = '/api';
export const AUTH_BASE_PATH = `${API}/auth`;
export const GAME_BASE_PATH = `${API}/game`;
export const PROFILE_BASE_PATH = `${API}/profile`;

export const EDIT_PROFILE = [];

export const BACKGROUND = '#ede8e0';
export const PRIMARY = '#be342d';
