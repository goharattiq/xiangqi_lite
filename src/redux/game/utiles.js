/* eslint-disable import/prefer-default-export */
export const initMatrix = (row, col) => {
  const board = Array(row).fill(Array(col).fill(Array(1)));
  // board[3][0] = 'p';
  // board[3][2] = 'p';
  // board[3][4] = 'p';
  // board[3][6] = 'p';
  // board[3][8] = 'p';

  return board;
};
