/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import {
  advisorMoves,
  cannonMoves,
  chariotMoves, elephantMoves, horseMoves, isCapital, kingMoves, pawnMoves,
} from './pieceMove';

// pices moves
// => Pawns move forward only
// => Cannon orthogoal
// => King  orthogonal
// => Advisor diagonal
// => Elephant 2 diagonal
// => Horses  1 orthogonal + 1 diagonal
// => Chariot orthogoal

export const isValidMove = (move, hints) => {
  const cellLocation = move.destination.droppableId.split('-')[1];
  return hints.includes(parseInt(cellLocation, 10));
};

export const setPiecePositions = (board) => {
  let pieceID = 0;
  // pawn index 0-4black 5-9red

  const pawns = ['p', 'P'];
  pawns.forEach((pawn) => {
    const position = isCapital(pawn) ? 3 : 6;
    for (let index = 0; index < 5; index += 1) {
      board[position][index * 2].piece = setPiece(pieceID++, pawn);
    }
  });

  // cannon index 10-11black 12-13red
  const cannons = ['c', 'C'];
  cannons.forEach((cannon) => {
    const position = isCapital(cannon) ? 2 : 7;
    board[position][1].piece = setPiece(pieceID++, cannon);
    board[position][7].piece = setPiece(pieceID++, cannon);
  });

  // chariot index 14-15black 16-17red
  const chariots = ['r', 'R'];
  chariots.forEach((chariot) => {
    const position = isCapital(chariot) ? 0 : 9;
    board[position][0].piece = setPiece(pieceID++, chariot);
    board[position][8].piece = setPiece(pieceID++, chariot);
  });

  // horses index 18-19black 20-21red
  const horses = ['h', 'H'];
  horses.forEach((horse) => {
    const position = isCapital(horse) ? 0 : 9;
    board[position][1].piece = setPiece(pieceID++, horse);
    board[position][7].piece = setPiece(pieceID++, horse);
  });

  // elephants index 22-23black 24-25red
  const elephants = ['e', 'E'];
  elephants.forEach((elephant) => {
    const position = isCapital(elephant) ? 0 : 9;
    board[position][2].piece = setPiece(pieceID++, elephant);
    board[position][6].piece = setPiece(pieceID++, elephant);
  });

  // adviors index 26-27black 28-29red
  const adviors = ['a', 'A'];
  adviors.forEach((advior) => {
    const position = isCapital(advior) ? 0 : 9;
    board[position][3].piece = setPiece(pieceID++, advior);
    board[position][5].piece = setPiece(pieceID++, advior);
  });

  // king index 30black 31red
  const kings = ['k', 'K'];
  kings.forEach((king) => {
    const position = isCapital(king) ? 0 : 9;
    board[position][4].piece = setPiece(pieceID++, king);
  });
  return board;
};

export const setPiece = (id, name) => ({
  id,
  name,
});

export const changeDroppableStyle = (expectedMove, previousExpectedMove) => {
  if (previousExpectedMove && previousExpectedMove.destination) {
    const previousBox = document.getElementById(previousExpectedMove.destination.droppableId);
    previousBox.classList.remove('expected-move');
  }
  if (!expectedMove || !expectedMove.destination) return;

  const box = document.getElementById(expectedMove.destination.droppableId);
  box.classList.add('expected-move');
};

export const pieceAnimateStart = (movingPieceID) => {
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.add('animate');
};

export const pieceAnimateEnd = (movingPieceID) => {
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.remove('animate');
};

export const cell = (id, piece) => ({
  id,
  piece,
});

export const hintMoves = (pieceName, location, board) => {
  let expectedLocations = [];
  switch (pieceName.toLowerCase()) {
    case 'p':
      expectedLocations = pawnMoves(pieceName, location, expectedLocations, board);
      break;
    case 'k':
      expectedLocations = kingMoves(pieceName, location, expectedLocations, board);
      break;
    case 'r':
      expectedLocations = chariotMoves(pieceName, location, expectedLocations, board);
      break;
    case 'c':
      expectedLocations = cannonMoves(pieceName, location, expectedLocations, board);
      break;
    case 'e':
      expectedLocations = elephantMoves(pieceName, location, expectedLocations, board);
      break;
    case 'a':
      expectedLocations = advisorMoves(pieceName, location, expectedLocations, board);
      break;
    case 'h':
      expectedLocations = horseMoves(pieceName, location, expectedLocations, board);
      break;

    default:
      break;
  }
  return expectedLocations;
};

export const indexToID = (x, y) => (x * 9 + y);
