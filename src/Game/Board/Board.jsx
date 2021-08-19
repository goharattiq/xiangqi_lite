/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { hintMove, pieceMove } from '../../redux/game/actions';
import Row from './Row';
import {
  changeDroppableStyle,
  hintMoves,
  pieceAnimateEnd,
  pieceAnimateStart,
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
    pieceAnimateStart(expectedMove.draggableId);
    if (!historyMode) {
      const hintLocations = hintMoves(
        expectedMove.draggableId.split('-')[0],
        expectedMove.source.droppableId.split('-')[1], board,
      );
      dispatch(hintMove(hintLocations));
    }
  };
  const onDragEnd = (move) => {
    if (!historyMode) {
      dispatch(pieceMove(move));
      dispatch(hintMove([]));
    }
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimateEnd(move.draggableId);
    setPreviousExpectedMove(move);
  };
  const clickHandler = (pieceName, location) => {
    if (!historyMode) {
      const hintLocations = hintMoves(pieceName, location, board);
      dispatch(hintMove(hintLocations));
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
