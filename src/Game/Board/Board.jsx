/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { hintMove, pieceMove } from '../../redux/game/actions';
import { changeDroppableStyle, hintMoves, pieceAnimateStart } from '../../gameUtils';
import Row from './Row';
import './Board.scss';
import { isCapital } from '../../pieceMoveUtils';
import HitPiece from './HitPiece';

const Board = () => {
  const [previousExpectedMove, setPreviousExpectedMove] = useState(null);
  const { board, hitPiece } = useSelector(({ game }) => ({
    board: game.board,
    hitPiece: game.hitPiece,
  }));
  const redHitPieces = hitPiece.filter((piece) => isCapital(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !isCapital(piece.name));
  const dispatch = useDispatch();
  const onDragUpdate = (expectedMove) => {
    if (!expectedMove.destination) return;
    changeDroppableStyle(expectedMove, previousExpectedMove);
    pieceAnimateStart(expectedMove.draggableId);
    setPreviousExpectedMove(expectedMove);
  };
  const onDragStart = (expectedMove) => {
    const hintLocations = hintMoves(expectedMove.draggableId.split('-')[0],
      expectedMove.source.droppableId.split('-')[1], board);
    dispatch(hintMove(hintLocations));
  };
  const onDragEnd = (move) => {
    dispatch(pieceMove(move, previousExpectedMove));
    dispatch(hintMove([]));
  };
  const clickHandler = (pieceName, location) => {
    const hintLocations = hintMoves(pieceName, location, board);
    dispatch(hintMove(hintLocations));
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
    </>

  );
};

export default Board;
