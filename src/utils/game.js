/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { MAP } from './constants';
import {
  cannonMoves,
  chariotMoves,
  horseMoves,
  advisorElephantMoves,
  kingPawnMoves,
  whichSide,
} from './pieceMove';

// pices moves
// => Pawns move forward only
// => Cannon orthogoal
// => King  orthogonal
// => Advisor diagonal
// => Elephant 2 diagonal
// => Horses  1 orthogonal + 1 diagonal
// => Chariot orthogoal

export const initMatrix = (row, col) => {
  let board = Array(row);
  let id = 0;
  for (let i = 0; i < board.length; i += 1) {
    board[i] = Array(col);
    const rowArray = board[i];
    for (let j = 0; j < rowArray.length; j += 1) {
      rowArray[j] = createCell(id, null);
      id += 1;
    }
  }
  board = setPiecePositions(board);
  return board;
};

export const isValidMove = (move, hints) => {
  const cellLocation = move.destination.droppableId.split('-')[1];
  return hints.includes(parseInt(cellLocation, 10));
};

export const setPiecePositions = (board) => {
  let pieceID = 0;
  // pawn index 0-4black 5-9red

  const pawns = ['p', 'P'];
  pawns.forEach((pawn) => {
    const position = whichSide(pawn) ? 3 : 6;
    for (let index = 0; index < 5; index += 1) {
      board[position][index * 2].piece = createPiece(pieceID++, pawn);
    }
  });

  // cannon index 10-11black 12-13red
  const cannons = ['c', 'C'];
  cannons.forEach((cannon) => {
    const position = whichSide(cannon) ? 2 : 7;
    board[position][1].piece = createPiece(pieceID++, cannon);
    board[position][7].piece = createPiece(pieceID++, cannon);
  });

  // chariot index 14-15black 16-17red
  const chariots = ['r', 'R'];
  chariots.forEach((chariot) => {
    const position = whichSide(chariot) ? 0 : 9;
    board[position][0].piece = createPiece(pieceID++, chariot);
    board[position][8].piece = createPiece(pieceID++, chariot);
  });

  // horses index 18-19black 20-21red
  const horses = ['h', 'H'];
  horses.forEach((horse) => {
    const position = whichSide(horse) ? 0 : 9;
    board[position][1].piece = createPiece(pieceID++, horse);
    board[position][7].piece = createPiece(pieceID++, horse);
  });

  // elephants index 22-23black 24-25red
  const elephants = ['e', 'E'];
  elephants.forEach((elephant) => {
    const position = whichSide(elephant) ? 0 : 9;
    board[position][2].piece = createPiece(pieceID++, elephant);
    board[position][6].piece = createPiece(pieceID++, elephant);
  });

  // adviors index 26-27black 28-29red
  const adviors = ['a', 'A'];
  adviors.forEach((advior) => {
    const position = whichSide(advior) ? 0 : 9;
    board[position][3].piece = createPiece(pieceID++, advior);
    board[position][5].piece = createPiece(pieceID++, advior);
  });

  // king index 30black 31red
  const kings = ['k', 'K'];
  kings.forEach((king) => {
    const position = whichSide(king) ? 0 : 9;
    board[position][4].piece = createPiece(pieceID++, king);
  });
  return board;
};

export const createPiece = (id, name) => ({
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

export const pieceAnimationStart = (movingPieceID) => {
  // console.log(movingPieceID);
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.add('animate');
};

export const pieceAnimationEnd = (movingPieceID) => {
  // console.log(movingPieceID);
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.remove('animate');
};

export const createCell = (id, piece) => ({
  id,
  piece,
});

export const getHintMoves = (pieceName, location, board) => {
  let expectedLocations = [];
  switch (MAP[pieceName.toLowerCase()]) {
    case MAP.p:
    case MAP.k:
      expectedLocations = kingPawnMoves(pieceName, location, expectedLocations, board);
      break;
    case MAP.r:
      expectedLocations = chariotMoves(pieceName, location, expectedLocations, board);
      break;
    case MAP.c:
      expectedLocations = cannonMoves(pieceName, location, expectedLocations, board);
      break;
    case MAP.e:
    case MAP.a:
      expectedLocations = advisorElephantMoves(pieceName, location, expectedLocations, board);
      break;
    case MAP.h:
      expectedLocations = horseMoves(pieceName, location, expectedLocations, board);
      break;

    default:
      break;
  }
  return expectedLocations;
};
