/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { pieceMove } from '../../redux/game/actions';
import { changeDroppableStyle } from '../../redux/game/utiles';
import Row from './Row';
import './Board.scss';

const Board = () => {
  const { board } = useSelector(({ game }) => ({ board: game.board }));
  const dispatch = useDispatch();
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const onDragUpdate = (expectedMove) => {
    if (!expectedMove.destination) return;
    changeDroppableStyle(expectedMove, previousExpectedMove);
    setPreviousExpectedMove(expectedMove);
  };
  const onDragEnd = (move) => {
    dispatch(pieceMove(move, previousExpectedMove));
  };
  return (
    <table className="col-8 border border-primary">
      <tbody>
        <DragDropContext
          onDragEnd={(move) => onDragEnd(move)}
          onDragUpdate={(move) => onDragUpdate(move)}
        >
          {
            board.map((row, rowIndex) => (
              <tr
                className="border border-primary"
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
