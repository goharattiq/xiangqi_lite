/* eslint-disable import/prefer-default-export */
export const initMatrix = (row, col) => {
  // const board = Array(row).fill(Array(col).fill(Array(1)));

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
  board[3][0].item = 'p';
  board[3][2].item = 'p';
  board[3][4].item = 'p';
  board[3][6].item = 'p';
  board[3][8].item = 'p';
  return board;
};

const cell = (id, item) => ({
  id,
  item,
});

export const onPieceMove = (result, previousState) => {
  // console.log(result);
  const { board } = previousState;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const [sourceI, sourceJ] = indexGen(parseInt(source.droppableId.split('-')[1], 10));
    const [destI, destJ] = indexGen(parseInt(destination.droppableId.split('-')[1], 10));
    board[destI][destJ].item = board[sourceI][sourceJ].item;
    board[sourceI][sourceJ].item = null;
    console.log([sourceI, sourceJ]);
    console.log([destI, destJ]);

    return board;
  }
  return previousState.board;
  // return initMatrix(10, 9);
};

const indexGen = (num) => [Math.floor(num / 9), Math.floor(num % 9)];
