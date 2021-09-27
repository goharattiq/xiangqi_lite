/* eslint-disable no-mixed-operators */
import { socketSendMoves, socketEndGame } from '../../socketio/gameSocketio';
import {
  GAME_RATED, GAME_TIMED, GAME_TIMER, GAME_TYPE, SIDE,
} from '../../utilis/constants';
import { isValidMove } from '../../utilis/game';
import { matrixPosition, whichSide } from '../../utilis/pieceMove';
import { HISTORY_MOVE_BACK } from './type';

export const onPieceMove = (move, previousState, history, fromSockets) => {
  const {
    board, hints, params, historyMode,
  } = previousState;
  let { source, destination } = move;
  if (history.mode && history.type === HISTORY_MOVE_BACK) {
    [source, destination] = [destination, source];
  }
  if (!destination) {
    return {
      board, hitPiece: null, history: null, turnChanged: false,
    };
  }
  const moveAudioTag = document.getElementById('move-audio');
  const hitAudioTag = document.getElementById('hit-audio');
  const [sourceI, sourceJ] = matrixPosition(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = matrixPosition(parseInt(destination.droppableId.split('-')[1], 10));

  if (historyMode && fromSockets) {
    return {
      board, hitPiece: move.hit, history: move, turnChanged: true,
    };
  }

  // checking if source and destintation dropped location is not same and the
  // destination location if not empty then must not contain same side piece
  // and the piece has valid move
  if ((source.droppableId !== destination.droppableId)
    && (!board[destI][destJ].piece || !(whichSide(board[destI][destJ].piece.name)
    === whichSide(board[sourceI][sourceJ].piece.name)))
    && (isValidMove(move, hints) || history.mode || fromSockets)) {
    const hitPiece = board[destI][destJ].piece;
    board[destI][destJ].piece = board[sourceI][sourceJ].piece;
    board[sourceI][sourceJ].piece = history.mode && history.type === HISTORY_MOVE_BACK
      ? move.hit : null;
    // eslint-disable-next-line no-param-reassign
    move.hit = history.mode && history.type === HISTORY_MOVE_BACK ? move.hit : hitPiece;
    if (!hitPiece) {
      moveAudioTag.play();
    } else {
      hitAudioTag.play();
    }
    if (!history.mode && !fromSockets) {
      socketSendMoves(previousState.params.id, move, board);
    }
    if (!history.mode && !fromSockets && hitPiece && (hitPiece.name === 'k' || hitPiece.name === 'K')) {
      // eslint-disable-next-line camelcase
      const { player_1, player_2 } = params;
      const looser = whichSide(hitPiece.name) === player_1.side
        ? player_1.profile.user.pk : player_2.profile.user.pk;
      socketEndGame(params.id, { player_1, player_2 }, looser, 'KING_DIED', params.is_rated);
    }
    return {
      board, hitPiece, history: move, turnChanged: true,
    };
  }
  return {
    board, hitPiece: null, history: null, turnChanged: false,
  };
};

export const isValidGameParams = (params, searchNames) => (
  (GAME_TYPE.includes(params.gameType))
  && (GAME_RATED.includes(params.gameRated))
  && ((GAME_TIMED[1] === (params.gameTimed))
    || ((GAME_TIMED[0] === (params.gameTimed)
    && GAME_TIMER[params.moveTime].includes(String(params.gameTimer)))))
  && (SIDE.includes(params.side))
  && (!params.challenge
    || (params.challenge && searchNames.find(
      (user) => user.username === params.username,
    ))
  )
);
