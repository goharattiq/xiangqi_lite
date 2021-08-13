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
