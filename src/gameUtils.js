/* eslint-disable no-mixed-operators */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */

// pices moves
// => Pawns move forward only
// => Cannon orthogoal
// => King  orthogonal
// => Advisor diagonal
// => Elephant 2 diagonal
// => Horses  1 orthogonal + 1 diagonal
// => Chariot orthogoal

export const isValidMove = (move, board) => {
  const { source, destination } = move;
  const [pieceName] = move.draggableId.split('-');
  const mapObject = moveMapping[pieceName.toLowerCase()];
  const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
  const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));
  const riverLocation = isCapital(pieceName) ? 4 : 5;
  let newLocationI = isCapital(pieceName) ? mapObject.orthogonal : -mapObject.orthogonal;
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
  if (mapObject.orthogonal > 0 && mapObject.diagonal === 0
    && (sourceI === destI || sourceJ === destJ) && pieceName.toLowerCase() !== 'p') {
    let tempSourceI = sourceI;
    let tempSourceJ = sourceJ;
    newLocationI = sourceI === destI ? 0 : sourceI > destI ? -1 : 1;
    newLocationJ = sourceJ === destJ ? 0 : sourceJ > destJ ? -1 : 1;
    let canJump = mapObject.jump;
    for (let index = mapObject.orthogonal; index > 0; index--) {
      tempSourceI += newLocationI;
      tempSourceJ += newLocationJ;
      if (tempSourceI === destI && tempSourceJ === destJ) {
        // restriced area only for king
        // cannon cannnot jump over and landed empty location
        // cannon cannnot hit directly
        if ((pieceName.toLowerCase() === 'k' && !isValidKingAdvisorRange(destI, destJ, isCapital(pieceName)))
          || (pieceName.toLowerCase() === 'c' && !canJump && !board[destI][destJ].piece)
          || (pieceName.toLowerCase() === 'c' && canJump && board[destI][destJ].piece)) {
          return false;
        }
        return true;
      }
      if (isValidRange(tempSourceI, tempSourceJ) && board[tempSourceI][tempSourceJ].piece) {
        if (canJump) {
          canJump = false;
          continue;
        }
        return false;
      }
    }
    return false;
  }
  // Advisor + Eelephant
  if (mapObject.diagonal > 0 && pieceName.toLowerCase() !== 'h') {
    let tempSourceI = sourceI;
    let tempSourceJ = sourceJ;
    newLocationI = sourceI > destI ? -1 : 1;
    newLocationJ = sourceJ > destJ ? -1 : 1;
    // elephant cannot cross river
    if ((isCapital(pieceName) && destI > riverLocation)
      || (!isCapital(pieceName) && destI < riverLocation)) {
      return false;
    }
    for (let index = mapObject.diagonal; index >= 0; index--) {
      tempSourceI += newLocationI;
      tempSourceJ += newLocationJ;
      if (tempSourceI === destI && tempSourceJ === destJ && index === 1) {
        // restriced area only for advisor
        if (pieceName.toLowerCase() === 'a' && !isValidKingAdvisorRange(destI, destJ, isCapital(pieceName))) {
          return false;
        }

        return true;
      }

      if (isValidRange(tempSourceI, tempSourceJ) && board[tempSourceI][tempSourceJ].piece) {
        return false;
      }
    }
    return false;
  }
  // horse only
  if (pieceName.toLowerCase() === 'h') {
    let tempSourceI = sourceI;
    let tempSourceJ = sourceJ;
    newLocationI = sourceI > destI ? -1 : 1;
    newLocationJ = sourceJ > destJ ? -2 : 2;
    for (let index = 0; index < 2; index++) {
      tempSourceI += newLocationI;
      tempSourceJ += newLocationJ;
      if (tempSourceI === destI && tempSourceJ === destJ) {
        newLocationJ = sourceJ > destJ ? -1 : 1;
        // check if horse is blocked or not
        if (board[tempSourceI - newLocationI][tempSourceJ - newLocationJ].piece) {
          return false;
        }
        return true;
      }
      newLocationJ = newLocationJ > 0 ? -1 : 1;
    }
    return false;
  }
  return false;
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

export const isCapital = (str) => /[A-Z]/.test(str.at(0));

export const setPiece = (id, name) => ({
  id,
  name,
});

const isValidRange = (x, y) => (x >= 0 && x <= 9) && (y >= 0 && y <= 8);

const isValidKingAdvisorRange = (x, y, side) => {
  if (side) {
    return (x >= 0 && x <= 2) && (y >= 3 && y <= 5);
  }
  return (x >= 7 && x <= 9) && (y >= 3 && y <= 5);
};

export const indexGen = (num) => [Math.floor(num / 9), Math.floor(num % 9)];

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
