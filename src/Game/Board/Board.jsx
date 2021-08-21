/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  hintMove,
  pieceMove,
  clearHintMove,
} from '../../redux/game/actions';
import Row from './Row';
import {
  changeDroppableStyle,
  pieceAnimationEnd,
  pieceAnimationStart,
} from '../../utils/game';
import './Board.scss';

const Board = ({ historyMode }) => {
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const dispatch = useDispatch();
  const { board } = useSelector(({ game }) => ({
    board: game.board,
    hitPiece: game.hitPiece,
    history: game.history,
  }));
  const onDragUpdate = (expectedMove) => {
    if (!expectedMove.destination) return;
    changeDroppableStyle(expectedMove, previousExpectedMove);
    setPreviousExpectedMove(expectedMove);
  };
  const onDragStart = (expectedMove) => {
    pieceAnimationStart(expectedMove.draggableId);
    if (!historyMode) {
      dispatch(hintMove(
        expectedMove.draggableId.split('-')[0],
        expectedMove.source.droppableId.split('-')[1],
      ));
    }
  };
  const onDragEnd = (move) => {
    if (!historyMode) {
      dispatch(pieceMove(move));
      dispatch(clearHintMove());
    }
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimationEnd(move.draggableId);
    setPreviousExpectedMove(move);
  };
  const clickHandler = (pieceName, location) => {
    if (!historyMode) {
      dispatch(hintMove(pieceName, location));
    }
  };
  return (
    <table className="rounded board">
      <tbody>
        <DragDropContext
          onDragEnd={(move) => onDragEnd(move)}
          onDragUpdate={(move) => onDragUpdate(move)}
          onDragStart={(move) => onDragStart(move)}
        >
          {
            board.map((row, rowIndex) => (
              <tr
                key={rowIndex}
              >
                <Row
                  row={row}
                  key={rowIndex}
                  clickHandler={clickHandler}
                />
              </tr>
            ))
          }
        </DragDropContext>
      </tbody>
    </table>
  );
};

Board.propTypes = {
  historyMode: PropTypes.bool.isRequired,
};

export default Board;
