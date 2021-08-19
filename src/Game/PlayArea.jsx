/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historyMoveBack, historyMoveForward } from '../redux/game/actions';
import Board from './Board/Board';
import HitPiece from './Board/HitPiece';
import History from './Board/History';
import { isCapital } from '../pieceMoveUtils';
import './PlayArea.scss';

const PlayArea = () => {
  const [historyMode, setHistoryMode] = useState(false);
  const { hitPiece, history } = useSelector(({ game }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
  }));
  const redHitPieces = hitPiece.filter((piece) => isCapital(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !isCapital(piece.name));
  const dispatch = useDispatch();

  const historyHandler = (pointer, isNext) => {
    if (pointer < history.length || (isNext && historyMode)) {
      setHistoryMode(true);
      // eslint-disable-next-line no-unused-expressions
      isNext ? dispatch(historyMoveForward(history[pointer - 1]))
        : dispatch(historyMoveBack(history[pointer]));
      if (pointer === history.length) {
        setHistoryMode(false);
      }
    } else {
      setHistoryMode(false);
    }
  };
  return (
    <div className="rounded play-area">
      <HitPiece hitPieces={redHitPieces} />
      <Board historyMode={historyMode} />
      <HitPiece hitPieces={blackHitPieces} />
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
    </div>
  );
};

export default PlayArea;
