/* eslint-disable no-loop-func */
import {
  BLACK, EAST, MAP, NORTH, RED, SOUTH, WEST,
} from './constants';

export const kingPawnMoves = (pieceName, indexLocation, expectedLocations, board) => {
  const [sourceI, sourceJ] = matrixPosition(indexLocation);
  let location = setInitalPosition(sourceI, sourceJ);
  const riverLocation = whichSide(pieceName) ? 4 : 5;
  let limitedMoves = 1;
  while ((location[NORTH] || location[SOUTH] || location[EAST] || location[WEST])
  && limitedMoves > 0) {
    location = movePiece(location, true);
    Object.entries(location).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && whichSide(board[direct.x][direct.y].piece.name) === whichSide(pieceName))) {
        if (MAP[pieceName.toLowerCase()] === MAP.p && whichSide(pieceName)
          && (id === SOUTH || (direct.x > riverLocation && (id === WEST || id === EAST)))) {
          // if red pawn and cross river or not
          expectedLocations.push(indexPosition(direct.x, direct.y));
        } else if (MAP[pieceName.toLowerCase()] === MAP.p && !whichSide(pieceName)
          && (id === NORTH || (direct.x < riverLocation && (id === WEST || id === EAST)))) {
          // if red pawn and cross river or not
          expectedLocations.push(indexPosition(direct.x, direct.y));
        }
        // king
        if (MAP[pieceName.toLowerCase()] === MAP.k
          && isValidKingAdvisorRange(direct.x, direct.y, whichSide(pieceName))) {
          expectedLocations.push(indexPosition(direct.x, direct.y));
        }
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

export const chariotMoves = (pieceName, indexLocation, expectedLocations, board) => {
  const [sourceI, sourceJ] = matrixPosition(indexLocation);
  let location = setInitalPosition(sourceI, sourceJ);
  while (location[NORTH] || location[SOUTH] || location[EAST] || location[WEST]) {
    location = movePiece(location, true);
    Object.entries(location).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && whichSide(board[direct.x][direct.y].piece.name) === whichSide(pieceName))) {
        expectedLocations.push(indexPosition(direct.x, direct.y));
        if (board[direct.x][direct.y].piece
          && whichSide(board[direct.x][direct.y].piece.name) !== pieceName) {
          location[id] = false;
        }
      } else {
        location[id] = false;
      }
    });
  }
  return expectedLocations;
};

export const cannonMoves = (pieceName, indexLocation, expectedLocations, board) => {
  const [sourceI, sourceJ] = matrixPosition(indexLocation);
  let location = setInitalPosition(sourceI, sourceJ);
  const directionJump = {
    [NORTH]: true,
    [SOUTH]: true,
    [EAST]: true,
    [WEST]: true,
  };
  const hit = {
    [NORTH]: false,
    [SOUTH]: false,
    [EAST]: false,
    [WEST]: false,
  };
  while (location[NORTH] || location[SOUTH] || location[EAST] || location[WEST]) {
    location = movePiece(location, true);
    Object.entries(location).forEach(([id, direct]) => {
      if (isValidRange(direct.x, direct.y)) {
        // can landed empty cell before jump
        if (directionJump[id] && location[id] && !board[direct.x][direct.y].piece) {
          expectedLocations.push(indexPosition(direct.x, direct.y));
        }
        // cannot hit direct and if jump than cannot landed if jump can only hit once
        if (!directionJump[id] && location[id] && (board[direct.x][direct.y].piece
          && whichSide(board[direct.x][direct.y].piece.name) !== whichSide(pieceName))
          && !hit[id]) {
          expectedLocations.push(indexPosition(direct.x, direct.y));
          hit[id] = true;
        }
        // if any piece than can jump
        if (board[direct.x][direct.y].piece) {
          directionJump[id] = false;
        }
      } else {
        location[id] = false;
      }
    });
  }
  return expectedLocations;
};

export const advisorElephantMoves = (pieceName, indexLocation, expectedLocations, board) => {
  const [sourceI, sourceJ] = matrixPosition(indexLocation);
  const riverLocation = whichSide(pieceName) ? 4 : 5;
  let location = setInitalPosition(sourceI, sourceJ);
  let limitedMoves = 2;
  while ((location[NORTH] || location[SOUTH] || location[EAST] || location[WEST])
    && limitedMoves > 0) {
    location = movePiece(location, false);
    // eslint-disable-next-line no-unused-vars
    Object.entries(location).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && whichSide(board[direct.x][direct.y].piece.name) === whichSide(pieceName))) {
        if (MAP[pieceName.toLowerCase()] === MAP.e && (limitedMoves === 1)
          && ((whichSide(pieceName) && direct.x <= riverLocation)
          || ((!whichSide(pieceName) && direct.x >= riverLocation)))) {
          expectedLocations.push(indexPosition(direct.x, direct.y));
        }
        if (MAP[pieceName.toLowerCase()] === MAP.a && (limitedMoves === 2)
          && isValidKingAdvisorRange(direct.x, direct.y, whichSide(pieceName))) {
          expectedLocations.push(indexPosition(direct.x, direct.y));
        }
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

export const horseMoves = (pieceName, indexLocation, expectedLocations, board) => {
  const [sourceI, sourceJ] = matrixPosition(indexLocation);
  let location = setInitalPosition(sourceI, sourceJ);
  const paring = {
    [NORTH]: WEST,
    [SOUTH]: EAST,
    [EAST]: NORTH,
    [WEST]: SOUTH,
  };
  location = movePiece(location, true);
  Object.entries(location).forEach(([id, direct]) => {
    if (direct && (isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece)) {
      const diagonalOne = moveDiagonal(direct, id);
      const diagonalTwo = moveDiagonal(direct, paring[id]);
      const diagonalArray = [diagonalOne, diagonalTwo];
      diagonalArray.forEach((diagonal) => {
        if ((isValidRange(diagonal.x, diagonal.y)) && !(board[diagonal.x][diagonal.y].piece
          && whichSide(board[diagonal.x][diagonal.y].piece.name) === whichSide(pieceName))) {
          expectedLocations.push(indexPosition(diagonal.x, diagonal.y));
        }
      });
    }
  });

  return expectedLocations;
};

const moveOrthogoanl = (location, direction) => {
  switch (direction) {
    case NORTH:
      return {
        ...location,
        x: location.x - 1,
      };
    case SOUTH:
      return {
        ...location,
        x: location.x + 1,
      };
    case EAST:
      return {
        ...location,
        y: location.y + 1,
      };
    case WEST:
      return {
        ...location,
        y: location.y - 1,
      };

    default:
      return null;
  }
};

const moveDiagonal = (location, direction) => {
  switch (direction) {
    case NORTH:
      return {
        x: location.x - 1,
        y: location.y + 1,
      };
    case SOUTH:
      return {
        x: location.x + 1,
        y: location.y - 1,
      };
    case EAST:
      return {
        x: location.x + 1,
        y: location.y + 1,
      };
    case WEST:
      return {
        x: location.x - 1,
        y: location.y - 1,
      };

    default:
      return null;
  }
};

const isValidRange = (x, y) => (x >= 0 && x <= 9) && (y >= 0 && y <= 8);
const isValidKingAdvisorRange = (x, y, side) => {
  if (side) {
    return (x >= 0 && x <= 2) && (y >= 3 && y <= 5);
  }
  return (x >= 7 && x <= 9) && (y >= 3 && y <= 5);
};
const indexPosition = (x, y) => (x * 9 + y);
const setLocation = (x, y) => ({ x, y });
export const whichSide = (piece) => (/[A-Z]/.test(piece.at(0)) ? RED : BLACK);
export const matrixPosition = (num) => [Math.floor(num / 9), Math.floor(num % 9)];

const setInitalPosition = (sourceI, sourceJ) => ({
  [NORTH]: setLocation(sourceI, sourceJ),
  [SOUTH]: setLocation(sourceI, sourceJ),
  [EAST]: setLocation(sourceI, sourceJ),
  [WEST]: setLocation(sourceI, sourceJ),
});

const movePiece = (location, isOrthogonal) => {
  const newLocation = location;
  const directions = [NORTH, SOUTH, EAST, WEST];
  if (isOrthogonal) {
    directions.forEach((direction) => {
      newLocation[direction] = newLocation[direction]
        ? moveOrthogoanl(newLocation[direction], direction) : false;
    });
  } else {
    directions.forEach((direction) => {
      newLocation[direction] = newLocation[direction]
        ? moveDiagonal(newLocation[direction], direction) : false;
    });
  }
  return newLocation;
};
