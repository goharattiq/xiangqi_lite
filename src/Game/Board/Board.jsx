/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { pieceMove } from '../../redux/game/actions';
import Row from './Row';
import './Board.scss';

const Board = () => {
  const { board } = useSelector(({ game }) => ({ board: game.board }));
  const dispatch = useDispatch();
  const onDragEnd = (move) => {
    dispatch(pieceMove(move));
    // console.log(movesss);
  };
  return (
    <table className="col-8 border border-primary">
      <tbody>
        <DragDropContext
          onDragEnd={(move) => onDragEnd(move)}
        >
          {
            board.map((row, rowIndex) => (
              <tr
                key={rowIndex}
              >
                <Row row={row} key={rowIndex} />
              </tr>
            ))
          }
        </DragDropContext>
      </tbody>
    </table>
  );
};

export default Board;
