/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { pieceMove } from '../../redux/game/actions';
import { changeDroppableStyle, hintMoves, pieceAnimateStart } from '../../gameUtils';
import Row from './Row';
import './Board.scss';

const Board = () => {
  const { board } = useSelector(({ game }) => ({ board: game.board }));
  const dispatch = useDispatch();
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const onDragUpdate = (expectedMove) => {
    if (!expectedMove.destination) return;
    changeDroppableStyle(expectedMove, previousExpectedMove);
    pieceAnimateStart(expectedMove.draggableId);
    setPreviousExpectedMove(expectedMove);
  };
  const onDragEnd = (move) => {
    dispatch(pieceMove(move, previousExpectedMove));
  };
  const clickHandler = (pieceName, location) => {
    const hintLocations = hintMoves(pieceName, location, board);
    console.log('expected locations', hintLocations);
    hintLocations.forEach((hint) => {
      // console.log(hint);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById(`spot-${hint}`)
        ? document.getElementById(`spot-${hint}`).style.visibility = 'visible' : '';
    });
  };

  return (
    <table className="rounded">
      <tbody>
        <DragDropContext
          onDragEnd={(move) => onDragEnd(move)}
          onDragUpdate={(move) => onDragUpdate(move)}
        >
          {
            board.map((row, rowIndex) => (
              <tr
                key={rowIndex}
              >
                <Row row={row} key={rowIndex} clickHandler={clickHandler} />
              </tr>
            ))
          }
        </DragDropContext>
      </tbody>
    </table>
  );
};

export default Board;
