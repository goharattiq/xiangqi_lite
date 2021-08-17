/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { hintMove, pieceMove } from '../../redux/game/actions';
import {
  changeDroppableStyle, hintMoves, pieceAnimateEnd, pieceAnimateStart,
} from '../../gameUtils';
import Row from './Row';
import './Board.scss';
import { isCapital } from '../../pieceMoveUtils';
import HitPiece from './HitPiece';
import History from './History';

const Board = () => {
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const [historyMode, setHistoryMode] = useState(false);
  const { board, hitPiece, history } = useSelector(({ game }) => ({
    board: game.board,
    hitPiece: game.hitPiece,
    history: game.history,
  }));
  const redHitPieces = hitPiece.filter((piece) => isCapital(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !isCapital(piece.name));
  const dispatch = useDispatch();
  const onDragUpdate = (expectedMove) => {
    if (!expectedMove.destination) return;
    changeDroppableStyle(expectedMove, previousExpectedMove);
    setPreviousExpectedMove(expectedMove);
  };
  const onDragStart = (expectedMove) => {
    pieceAnimateStart(expectedMove.draggableId);
    const hintLocations = hintMoves(
      expectedMove.draggableId.split('-')[0],
      expectedMove.source.droppableId.split('-')[1], board,
    );
    dispatch(hintMove(hintLocations));
  };
  const onDragEnd = (move) => {
    if (!historyMode) {
      dispatch(pieceMove(move, previousExpectedMove));
    }
    changeDroppableStyle(null, previousExpectedMove);
    pieceAnimateEnd(move.draggableId);
    setPreviousExpectedMove(move);
    dispatch(hintMove([]));
  };
  const clickHandler = (pieceName, location) => {
    const hintLocations = hintMoves(pieceName, location, board);
    dispatch(hintMove(hintLocations));
  };
  const historyHandler = (pointer, isNext) => {
    // eslint-disable-next-line no-param-reassign
    pointer = isNext ? pointer + 1 : pointer - 1;
    // console.log(pointer, history.length);
    if (pointer < history.length) {
      setHistoryMode(true);
    } else {
      setHistoryMode(false);
    }
  };
  return (
    <>
      <HitPiece hitPieces={redHitPieces} />
      <table className="rounded">
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
                <Row row={row} key={rowIndex} clickHandler={clickHandler} />
              </tr>
            ))
          }
          </DragDropContext>
        </tbody>
      </table>
      <HitPiece hitPieces={blackHitPieces} />
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
    </>

  );
};

export default Board;
