/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';

export const pawnMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
  const riverLocation = isCapital(pieceName) ? 4 : 5;
  let limitedMoves = 1;
  while ((direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST])
  && limitedMoves > 0) {
    direction[NORTH] = direction[NORTH] ? decrementOrthogoanl(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementOrthogoanl(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementOrthogoanl(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementOrthogoanl(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && isCapital(board[direct.x][direct.y].piece.name) === isCapital(pieceName))) {
        if (isCapital(pieceName)
          && (id === SOUTH || (direct.x > riverLocation && (id === WEST || id === EAST)))) {
          // if red pawn and cross river or not
          expectedLocations.push(indexToID(direct.x, direct.y));
        } else if (!isCapital(pieceName)
          && (id === NORTH || (direct.x < riverLocation && (id === WEST || id === EAST)))) {
          // if red pawn and cross river or not
          expectedLocations.push(indexToID(direct.x, direct.y));
        }
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

export const kingMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
  let limitedMoves = 1;
  while ((direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST])
  && limitedMoves > 0) {
    direction[NORTH] = direction[NORTH] ? decrementOrthogoanl(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementOrthogoanl(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementOrthogoanl(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementOrthogoanl(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && isCapital(board[direct.x][direct.y].piece.name) === isCapital(pieceName))
        && isValidKingAdvisorRange(direct.x, direct.y, isCapital(pieceName))) {
        expectedLocations.push(indexToID(direct.x, direct.y));
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

export const chariotMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
  while (direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST]) {
    direction[NORTH] = direction[NORTH] ? decrementOrthogoanl(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementOrthogoanl(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementOrthogoanl(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementOrthogoanl(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && isCapital(board[direct.x][direct.y].piece.name) === isCapital(pieceName))) {
        expectedLocations.push(indexToID(direct.x, direct.y));
        if (board[direct.x][direct.y].piece
          && isCapital(board[direct.x][direct.y].piece.name) !== pieceName) {
          direction[id] = false;
        }
      } else {
        direction[id] = false;
      }
    });
  }
  return expectedLocations;
};

export const cannonMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
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
  while (direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST]) {
    direction[NORTH] = direction[NORTH] ? decrementOrthogoanl(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementOrthogoanl(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementOrthogoanl(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementOrthogoanl(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if (isValidRange(direct.x, direct.y)) {
        // can landed empty cell before jump
        if (directionJump[id] && direction[id] && !board[direct.x][direct.y].piece) {
          expectedLocations.push(indexToID(direct.x, direct.y));
        }
        // cannot hit direct and if jump than cannot landed if jump can only hit once
        if (!directionJump[id] && direction[id] && (board[direct.x][direct.y].piece
          && isCapital(board[direct.x][direct.y].piece.name) !== isCapital(pieceName))
          && !hit[id]) {
          expectedLocations.push(indexToID(direct.x, direct.y));
          hit[id] = true;
        }
        // if any piece than can jump
        if (board[direct.x][direct.y].piece) {
          directionJump[id] = false;
        }
      } else {
        direction[id] = false;
      }
    });
  }
  return expectedLocations;
};

export const elephantMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const riverLocation = isCapital(pieceName) ? 4 : 5;
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
  let limitedMoves = 2;
  while ((direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST])
    && limitedMoves > 0) {
    direction[NORTH] = direction[NORTH] ? decrementDiagonal(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementDiagonal(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementDiagonal(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementDiagonal(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && isCapital(board[direct.x][direct.y].piece.name) === isCapital(pieceName))) {
        if ((limitedMoves === 1) && ((isCapital(pieceName) && direct.x <= riverLocation)
          || ((!isCapital(pieceName) && direct.x >= riverLocation)))) {
          expectedLocations.push(indexToID(direct.x, direct.y));
        }
      } else {
        direction[id] = false;
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

export const advisorMoves = (pieceName, location, expectedLocations, board) => {
  const [sourceI, sourceJ] = indexGen(location);
  const direction = {
    [NORTH]: setLocation(sourceI, sourceJ),
    [SOUTH]: setLocation(sourceI, sourceJ),
    [EAST]: setLocation(sourceI, sourceJ),
    [WEST]: setLocation(sourceI, sourceJ),
  };
  let limitedMoves = 1;
  while ((direction[NORTH] || direction[SOUTH] || direction[EAST] || direction[WEST])
    && limitedMoves > 0) {
    direction[NORTH] = direction[NORTH] ? decrementDiagonal(direction[NORTH], NORTH) : false;
    direction[SOUTH] = direction[SOUTH] ? decrementDiagonal(direction[SOUTH], SOUTH) : false;
    direction[EAST] = direction[EAST] ? decrementDiagonal(direction[EAST], EAST) : false;
    direction[WEST] = direction[WEST] ? decrementDiagonal(direction[WEST], WEST) : false;
    Object.entries(direction).forEach(([id, direct]) => {
      if ((isValidRange(direct.x, direct.y)) && !(board[direct.x][direct.y].piece
        && isCapital(board[direct.x][direct.y].piece.name) === isCapital(pieceName))
        && isValidKingAdvisorRange(direct.x, direct.y, isCapital(pieceName))) {
        expectedLocations.push(indexToID(direct.x, direct.y));
      } else {
        direction[id] = false;
      }
    });
    limitedMoves -= 1;
  }
  return expectedLocations;
};

const decrementOrthogoanl = (obj, direction) => {
  switch (direction) {
    case 'NORTH':
      return {
        ...obj,
        x: obj.x - 1,
      };
    case 'SOUTH':
      return {
        ...obj,
        x: obj.x + 1,
      };
    case 'EAST':
      return {
        ...obj,
        y: obj.y + 1,
      };
    case 'WEST':
      return {
        ...obj,
        y: obj.y - 1,
      };

    default:
      return null;
  }
};

const decrementDiagonal = (obj, direction) => {
  switch (direction) {
    case 'NORTH':
      return {
        x: obj.x - 1,
        y: obj.y + 1,
      };
    case 'SOUTH':
      return {
        x: obj.x + 1,
        y: obj.y - 1,
      };
    case 'EAST':
      return {
        x: obj.x + 1,
        y: obj.y + 1,
      };
    case 'WEST':
      return {
        x: obj.x - 1,
        y: obj.y - 1,
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
const indexToID = (x, y) => (x * 9 + y);
const setLocation = (x, y) => ({ x, y });
export const isCapital = (str) => /[A-Z]/.test(str.at(0));
export const indexGen = (num) => [Math.floor(num / 9), Math.floor(num % 9)];
