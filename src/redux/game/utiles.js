/* eslint-disable import/prefer-default-export */
export const initMatrix = (row, col) => {
  const board = Array(row);
  let id = 0;
  for (let i = 0; i < board.length; i += 1) {
    board[i] = Array(col);
    const rowArray = board[i];
    for (let j = 0; j < rowArray.length; j += 1) {
      rowArray[j] = cell(id, null);
      id += 1;
    }
  }
  board[3][0].piece = piece(0, 'p');
  board[3][2].piece = piece(1, 'p');
  board[3][4].piece = piece(2, 'P');
  board[3][6].piece = piece(3, 'p');
  board[3][8].piece = piece(4, 'P');
  return board;
};

export const onPieceMove = (action, previousState) => {
  const { move, previousExpectedMove } = action;
  const { board } = previousState;
  const { source, destination } = move;
  if (!destination) {
    changeDroppableStyle(null, previousExpectedMove);
    return previousState.board;
  }
  if (source.droppableId !== destination.droppableId) {
    const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
    const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));
    board[destI][destJ].piece = board[sourceI][sourceJ].piece;
    board[sourceI][sourceJ].piece = null;
    changeDroppableStyle(null, previousExpectedMove);
    return board;
  }
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

const cell = (id, piece) => ({
  id,
  piece,
});

const piece = (id, name) => ({
  id,
  name,
});

const indexGen = (num) => [Math.floor(num / 9), Math.floor(num % 9)];
