import { setPiecePositions, cell, isValidMove } from '../../gameUtils';
import { indexGen, isCapital } from '../../pieceMoveUtils';

/* eslint-disable import/prefer-default-export */
export const initMatrix = (row, col) => {
  let board = Array(row);
  let id = 0;
  for (let i = 0; i < board.length; i += 1) {
    board[i] = Array(col);
    const rowArray = board[i];
    for (let j = 0; j < rowArray.length; j += 1) {
      rowArray[j] = cell(id, null);
      id += 1;
    }
  }
  board = setPiecePositions(board);
  return board;
};

export const onPieceMove = (move, previousState, history) => {
  const { board, hints } = previousState;
  let { source, destination } = move;
  if (history.mode && history.type === 'HISTORY_MOVE_BACK') {
    [source, destination] = [destination, source];
  }
  if (!destination) {
    return { board, hitPiece: null, history: null };
  }

  const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));
  // checking if source and destintation dropped location is not same and the
  // destination location if not empty then must not contain same side piece
  // and the piece has valid move
  if ((source.droppableId !== destination.droppableId)
    && (!board[destI][destJ].piece || !(isCapital(board[destI][destJ].piece.name)
    === isCapital(board[sourceI][sourceJ].piece.name)))
    && (isValidMove(move, hints) || history.mode)) {
    const hitPiece = board[destI][destJ].piece;
    board[destI][destJ].piece = board[sourceI][sourceJ].piece;
    board[sourceI][sourceJ].piece = null;
    return { board, hitPiece, history: move };
  }
  return { board, hitPiece: null, history: null };
};
