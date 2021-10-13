import {
  INIT_BOARD,
  PIECE_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  CLEAR_HINT_MOVE,
  SET_GAME_PARAMS,
  SEARCH_NAME,
  CLEAR_GAME,
  ANNOUNCE_WINNER,
  WAIT_TIMER,
  TOGGLE_HISTORY_MODE,
} from './type';

export const initBoard = (board, hitPiece, history, gameParams) => ({
  type: INIT_BOARD,
  payload: {
    board, hitPiece, history, gameParams,
  },
});

// eslint-disable-next-line camelcase
export const pieceMove = (move, fromSockets, player_1, player_2, playerTurn) => ({
  type: PIECE_MOVE,
  payload: {
    move, fromSockets, player_1, player_2, playerTurn,
  },
});

export const hintMove = (pieceName, location) => ({
  type: HINT_MOVE,
  payload: { pieceName, location },
});

export const clearHintMove = () => ({
  type: CLEAR_HINT_MOVE,
});

export const historyMoveBack = (move) => ({
  type: HISTORY_MOVE_BACK,
  payload: move,
});

export const historyMoveForward = (move) => ({
  type: HISTORY_MOVE_FORWARD,
  payload: move,
});

export const gameParamsAct = (params) => ({
  type: SET_GAME_PARAMS,
  payload: params,
});

export const searchUsername = (searchedUsers) => ({
  type: SEARCH_NAME,
  payload: searchedUsers,
});

export const announceWinner = (winner) => ({
  type: ANNOUNCE_WINNER,
  payload: winner,
});

export const clearGame = () => ({
  type: CLEAR_GAME,
});

export const waitTimer = (isStart) => ({
  type: WAIT_TIMER,
  payload: isStart,
});

export const toggleHistoryMode = (mode) => ({
  type: TOGGLE_HISTORY_MODE,
  payload: mode,
});
