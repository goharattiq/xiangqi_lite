/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import spin from 'spinatrix';

import { hintMove, pieceMove, clearHintMove } from '../../redux/game/actions';
import hitAudio from '../../static/audio/hit.ogg';
import moveAudio from '../../static/audio/move.ogg';
import { ReactComponent as Background } from '../../static/img/background/board.svg';
import { changeDroppableStyle, pieceAnimationEnd, pieceAnimationStart } from '../../utilis/game';
import Row from './Row';
import './Board.scss';

const Board = ({ historyMode, isRotate }) => {
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState({
    pieceName: null,
    location: null,
    pieceId: null,
  });
  const dispatch = useDispatch();
  let { board } = useSelector(({ game }) => ({
    board: game.board,
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
      dispatch(pieceMove(move, false, null, null, null));
      dispatch(clearHintMove());
    }
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimationEnd(move.draggableId);
    setPreviousExpectedMove(move);
  };
  const clickHandler = (pieceName, location, pieceId) => {
    if (!historyMode) {
      dispatch(hintMove(pieceName, location));
      setSelectedPiece({ pieceName, location, pieceId });
    }
  };

  if (isRotate) {
    board = spin.x180(board);
  }
  return (
    <>
      <audio id="move-audio" src={moveAudio} />
      <audio id="hit-audio" src={hitAudio} />
      <Background className="board-background" />
      <table
        id="play-board"
        className="board"
      >
        <tbody>
          <DragDropContext
            onDragEnd={(move) => onDragEnd(move)}
            onDragUpdate={(move) => onDragUpdate(move)}
            onDragStart={(move) => onDragStart(move)}
          >
            {
              board && board.map((row, rowIndex) => (
                <Fragment key={`row-${row[0].id}`}>
                  {
                    rowIndex === 5 && <tr className="river" />
                  }
                  <tr>
                    <Row
                      row={row}
                      clickHandler={clickHandler}
                      selectedPiece={selectedPiece}
                    />
                  </tr>
                </Fragment>
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
  isRotate: PropTypes.bool.isRequired,
};

export default Board;
