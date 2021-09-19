/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { getHintMoves } from '../../utils/game';
import {
  CLEAR_HINT_MOVE,
  HINT_MOVE,
  HISTORY_MOVE_BACK,
  HISTORY_MOVE_FORWARD,
  INIT_BOARD,
  PIECE_MOVE,
  SEARCH_NAME,
  SET_GAME_PARAMS,
  CLEAR_GAME,
  ANNOUNCE_WINNER,
} from './type';
import { onPieceMove } from './utiles';

const initialState = {
  board: null,
  hints: [],
  hitPiece: [],
  history: [],
  params: null,
  searchNames: [],
  winner: null,
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
        params: payload.gameParams,
      };
    case PIECE_MOVE:
      const {
        board, hitPiece, history, turnChanged,
      } = onPieceMove(
        payload.move, state, { mode: false }, payload.fromSockets,
      );
      const player_1 = payload.player_1 ? payload.player_1 : state.params.player_1; 
      const player_2= payload.player_2 ? payload.player_2 : state.params.player_2;

      return {
        ...state,
        board,
        hitPiece: [...state.hitPiece, hitPiece].filter((piece) => (piece !== null)),
        history: [...state.history, history].filter((back) => (back !== null)),
        params: {
          ...state.params,
          player_1: player_1,
          player_2: player_2,
          player_turn: turnChanged && payload.playerTurn ? payload.playerTurn : turnChanged && state.params.player_turn === player_1.profile.user.pk ?
          player_2.profile.user.pk : turnChanged && state.params.player_turn === player_2.profile.user.pk ? player_1.profile.user.pk : state.params.player_turn,

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
    case SEARCH_NAME:
      return {
        ...state,
        searchNames: payload,
      };
    case ANNOUNCE_WINNER:
      return {
        ...state,
        winner: payload,
      };
    case CLEAR_GAME:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
