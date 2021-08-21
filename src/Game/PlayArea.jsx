/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historyMoveBack, historyMoveForward } from '../redux/game/actions';
import Board from './Board/Board';
import HitPiece from './Board/HitPiece';
import History from './Board/History';
import { whichSide } from '../utils/pieceMove';
import './PlayArea.scss';

const PlayArea = () => {
  const [historyMode, setHistoryMode] = useState(false);
  const { hitPiece, history } = useSelector(({ game }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
  }));
  const redHitPieces = hitPiece.filter((piece) => whichSide(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !whichSide(piece.name));
  const dispatch = useDispatch();

  const historyHandler = (pointer, isNext) => {
    if (pointer < history.length || (isNext && historyMode)) {
      setHistoryMode(true);
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
