import {
  INIT_BOARD,
  PIECE_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  CLEAR_HINT_MOVE,
  SET_GAME_PARAMS,
  PLAYER_TURN,
  SEARCH_NAME,
  ACTIVE_GAMES,
  SPECTATE_GAMES,
  CLEAR_GAME,
  ANNOUNCE_WINNER,
} from './type';

export const initBoard = (board, hitPiece, history, gameParams) => ({
  type: INIT_BOARD,
  payload: {
    board, hitPiece, history, gameParams,
  },
});

export const pieceMove = (move, fromSockets) => ({
  type: PIECE_MOVE,
  payload: { move, fromSockets },
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

export const playerTurn = (changePlayerTurn) => ({
  type: PLAYER_TURN,
  payload: changePlayerTurn,
});

export const searchUsername = (searchedUsers) => ({
  type: SEARCH_NAME,
  payload: searchedUsers,
});

export const activeGames = (games) => ({
  type: ACTIVE_GAMES,
  payload: games,
});

export const spectateGames = (games) => ({
  type: SPECTATE_GAMES,
  payload: games,
});

export const announceWinner = (winner) => ({
  type: ANNOUNCE_WINNER,
  payload: winner,
});

export const clearGame = () => ({
  type: CLEAR_GAME,
});
