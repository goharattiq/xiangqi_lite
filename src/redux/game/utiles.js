/* eslint-disable no-continue */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
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

export const onPieceMove = (action, previousState) => {
  const { move, previousExpectedMove } = action;
  const { board } = previousState;
  const { source, destination } = move;

  // console.log(move);
  if (!destination) {
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimateEnd(move.draggableId);
    return previousState.board;
  }

  const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));

  // checking if source and destintation dropped location is not same and the
  // destination location if not empty then must not contain same side piece
  if ((source.droppableId !== destination.droppableId)
  && (!board[destI][destJ].piece || !(isCapital(board[destI][destJ].piece.name)
  === isCapital(board[sourceI][sourceJ].piece.name))) && isValidMove(move, board)) {
    // isValidMove(move, board);
    board[destI][destJ].piece = board[sourceI][sourceJ].piece;
    board[sourceI][sourceJ].piece = null;
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimateEnd(move.draggableId);
    return board;
  }

  changeDroppableStyle(null, previousExpectedMove);
  pieceAnimateEnd(move.draggableId);
  return previousState.board;
};

export const changeDroppableStyle = (expectedMove, previousExpectedMove) => {
  if (previousExpectedMove && previousExpectedMove.destination) {
    const previousBox = document.getElementById(previousExpectedMove.destination.droppableId);
    previousBox.classList.remove('expected-move');
  }
  if (!expectedMove || !expectedMove.destination) return;

  const box = document.getElementById(expectedMove.destination.droppableId);
  box.classList.add('expected-move');
};

export const isCapital = (str) => /[A-Z]/.test(str.at(0));

const setPiecePositions = (board) => {
  let pieceID = 0;
  // pawn index 0-4black 5-9red
  const pawns = ['p', 'P'];
  pawns.forEach((pawn) => {
    const position = isCapital(pawn) ? 3 : 6;
    for (let index = 0; index < 5; index += 1) {
      board[position][index * 2].piece = piece(pieceID++, pawn);
    }
  });
  // cannon index 10-11black 12-13red
  const cannons = ['c', 'C'];
  cannons.forEach((cannon) => {
    const position = isCapital(cannon) ? 2 : 7;
    board[position][1].piece = piece(pieceID++, cannon);
    board[position][7].piece = piece(pieceID++, cannon);
  });
  // chariot index 14-15black 16-17red
  const chariots = ['r', 'R'];
  chariots.forEach((chariot) => {
    const position = isCapital(chariot) ? 0 : 9;
    board[position][0].piece = piece(pieceID++, chariot);
    board[position][8].piece = piece(pieceID++, chariot);
  });
  // horses index 18-19black 20-21red
  const horses = ['h', 'H'];
  horses.forEach((horse) => {
    const position = isCapital(horse) ? 0 : 9;
    board[position][1].piece = piece(pieceID++, horse);
    board[position][7].piece = piece(pieceID++, horse);
  });
  // elephants index 22-23black 24-25red
  const elephants = ['e', 'E'];
  elephants.forEach((elephant) => {
    const position = isCapital(elephant) ? 0 : 9;
    board[position][2].piece = piece(pieceID++, elephant);
    board[position][6].piece = piece(pieceID++, elephant);
  });
  // adviors index 26-27black 28-29red
  const adviors = ['a', 'A'];
  adviors.forEach((advior) => {
    const position = isCapital(advior) ? 0 : 9;
    board[position][3].piece = piece(pieceID++, advior);
    board[position][5].piece = piece(pieceID++, advior);
  });
  // king index 30black 31red
  const kings = ['k', 'K'];
  kings.forEach((king) => {
    const position = isCapital(king) ? 0 : 9;
    board[position][4].piece = piece(pieceID++, king);
  });
  return board;
};

export const pieceAnimateStart = (movingPieceID) => {
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.add('animate');
};

export const pieceAnimateEnd = (movingPieceID) => {
  const pieceElement = document.getElementById(movingPieceID);
  pieceElement.classList.remove('animate');
};

const cell = (id, piece) => ({
  id,
  piece,
});

const piece = (id, name) => ({
  id,
  name,
});

const indexGen = (num) => [Math.floor(num / 9), Math.floor(num % 9)];

// pices moves
// => Pawns move forward only
// => Cannon orthogoal
// => King  orthogonal
// => Advisor diagonal
// => Elephant 2 diagonal
// => Horses  1 orthogonal + 1 diagonal
// => Chariot orthogoal

const isValidMove = (move, board) => {
  console.log(board);
  // console.log(moveMapping[move.draggableId.split('-')[0].toLowerCase()]);
  const { source, destination } = move;
  const [pieceName] = move.draggableId.split('-');
  // console.log(pieceID);
  const mapObject = moveMapping[pieceName.toLowerCase()];
  const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));
  const riverLocation = isCapital(pieceName) ? 4 : 5;
  const newLocationI = isCapital(pieceName) ? mapObject.orthogonal : -mapObject.orthogonal;

  let newLocationJ;
  // Pawn only
  if (isCapital(pieceName)) {
    newLocationJ = sourceI > riverLocation ? mapObject.orthogonal : 0;
  } else {
    newLocationJ = sourceI < riverLocation ? mapObject.orthogonal : 0;
  }
  if (pieceName.toLowerCase() === 'p' && (sourceI + newLocationI === destI && sourceJ === destJ)
    || (sourceI === destI && (sourceJ + newLocationJ === destJ
      || sourceJ - newLocationJ === destJ))) {
    return true;
  }
  // Chariot + Cannon + King

  // Advisor + Eelephant + Horses
  if (mapObject.diagonal > 0) { return false; }
  return false;
};

const moveMapping = {
  p: {
    orthogonal: 1,
    diagonal: 0,
    jump: false,
  },
  c: {
    orthogonal: Infinity,
    diagonal: 0,
    jump: true,
  },
  k: {
    orthogonal: 1,
    diagonal: 0,
    jump: false,
  },
  a: {
    orthogonal: 0,
    diagonal: 1,
    jump: false,
  },
  e: {
    orthogonal: 0,
    diagonal: 2,
    jump: false,
  },
  h: {
    orthogonal: 1,
    diagonal: 1,
    jump: false,
  },
  r: {
    orthogonal: Infinity,
    diagonal: 0,
    jump: false,
  },
};
