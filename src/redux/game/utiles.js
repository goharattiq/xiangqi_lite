/* eslint-disable no-mixed-operators */
import { socketSendMoves } from '../../scoketio/socketio';
import { isValidMove } from '../../utils/game';
import { matrixPosition, whichSide } from '../../utils/pieceMove';

export const onPieceMove = (move, previousState, history, fromSockets) => {
  const { board, hints } = previousState;
  let { source, destination } = move;
  if (history.mode && history.type === 'HISTORY_MOVE_BACK') {
    [source, destination] = [destination, source];
  }
  if (!destination) {
    return {
      board, hitPiece: null, history: null, turnChanged: true,
    };
  }
  const moveAudioTag = document.getElementById('move-audio');
  const hitAudioTag = document.getElementById('hit-audio');
  const [sourceI, sourceJ] = matrixPosition(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = matrixPosition(parseInt(destination.droppableId.split('-')[1], 10));
  // checking if source and destintation dropped location is not same and the
  // destination location if not empty then must not contain same side piece
  // and the piece has valid move
  if ((source.droppableId !== destination.droppableId)
    && (!board[destI][destJ].piece || !(whichSide(board[destI][destJ].piece.name)
    === whichSide(board[sourceI][sourceJ].piece.name)))
    && (isValidMove(move, hints) || history.mode || fromSockets)) {
    const hitPiece = board[destI][destJ].piece;
    board[destI][destJ].piece = board[sourceI][sourceJ].piece;
    board[sourceI][sourceJ].piece = history.mode && history.type === 'HISTORY_MOVE_BACK' ? move.hit : null;
    // eslint-disable-next-line no-param-reassign
    move.hit = history.mode && history.type === 'HISTORY_MOVE_BACK' ? move.hit : hitPiece;
    if (!hitPiece) {
      moveAudioTag.play();
    } else {
      hitAudioTag.play();
    }
    if (!history.mode && !fromSockets) {
      socketSendMoves(previousState.params.id, move, board);
      return {
        board, hitPiece, history: move, turnChanged: false,
      };
    }
    return {
      board, hitPiece, history: move, turnChanged: true,
    };
  }
  return {
    board, hitPiece: null, history: null, turnChanged: false,
  };
};

export const isValidGameParams = (params) => ((params.gameType !== '') && (params.gameRated !== '')
                                        && (params.gameTimed !== '') && (params.side !== '')
                                        && (params.challenge && params.username !== ''));
