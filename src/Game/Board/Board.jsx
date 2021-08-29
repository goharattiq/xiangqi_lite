/* eslint-disable jsx-a11y/media-has-caption */
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
import moveAudio from '../../static/audio/move.ogg';
import hitAudio from '../../static/audio/hit.ogg';
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
      dispatch(pieceMove(move, false));
      dispatch(clearHintMove());
    }
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimationEnd(move.draggableId);
    setPreviousExpectedMove(move);
  };
  const clickHandler = (pieceID, pieceName, location) => {
    if (!historyMode) {
      dispatch(hintMove(pieceName, location));
    }
  };

  return (
    <>
      <audio id="move-audio" src={moveAudio} />
      <audio id="hit-audio" src={hitAudio} />
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
    </>
  );
};

Board.propTypes = {
  historyMode: PropTypes.bool.isRequired,
};

export default Board;
