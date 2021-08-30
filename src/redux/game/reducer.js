/* eslint-disable no-case-declarations */
import {
  ACTIVE_GAMES,
  CLEAR_HINT_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  INIT_BOARD,
  PIECE_MOVE,
  PLAYER_TURN,
  SEARCH_NAME,
  SET_GAME_PARAMS,
  SPECTATE_GAMES,
} from './type';
import { onPieceMove } from './utiles';
import { getHintMoves } from '../../utils/game';

const initialState = {
  board: null,
  hints: [],
  hitPiece: [],
  history: [],
  params: null,
  searchNames: [],
  activeGames: [],
  spectateGames: [],
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INIT_BOARD:
      return {
        ...state,
        board: payload.board,
        hitPiece: payload.hitPiece,
        history: payload.history,
      };
    case PIECE_MOVE:
      const {
        board, hitPiece, history, turnChanged,
      } = onPieceMove(
        payload.move, state, { mode: false }, payload.fromSockets,
      );
      return {
        ...state,
        board,
        hitPiece: [...state.hitPiece, hitPiece].filter((piece) => (piece !== null)),
        history: [...state.history, history].filter((back) => (back !== null)),
        params: {
          ...state.params,
          player_turn: turnChanged ? state.params.player_turn : false,
        },
      };
    case HINT_MOVE:
      const { pieceName, location } = payload;
      return {
        ...state,
        hints: getHintMoves(pieceName, location, state.board),
      };
    case CLEAR_HINT_MOVE:
      return {
        ...state,
        hints: [],
      };
    case HISTORY_MOVE_BACK:
      const historyBack = onPieceMove(payload, state, { mode: true, type: HISTORY_MOVE_BACK });
      return {
        ...state,
        board: historyBack.board,
      };

    case HISTORY_MOVE_FORWARD:
      const historyFor = onPieceMove(
        payload, state, { mode: true, type: HISTORY_MOVE_FORWARD },
      );
      return {
        ...state,
        board: historyFor.board,
      };
    case SET_GAME_PARAMS:
      return {
        ...state,
        params: payload,
      };
    case PLAYER_TURN:
      return {
        ...state,
        params: {
          ...state.params,
          player_turn: payload,
        },
      };
    case SEARCH_NAME:
      return {
        ...state,
        searchNames: payload,
      };

    case ACTIVE_GAMES:
      return {
        ...state,
        activeGames: payload,
      };

    case SPECTATE_GAMES:
      return {
        ...state,
        spectateGames: payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
