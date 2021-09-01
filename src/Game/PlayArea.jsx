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
import Timer from './Board/Timer';

const PlayArea = () => {
  const [historyMode, setHistoryMode] = useState(false);
  const {
    hitPiece, history, gameParams, playerTurn,
  } = useSelector(({ game }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
    gameParams: game.params,
    playerTurn: game.params.player_turn,
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
  const haveTurn = (turn) => (turn === playerTurn);
  const redPlayer = gameParams.player_1.side === 'Red' ? gameParams.player_1 : gameParams.player_2;
  const blackPlayer = gameParams.player_1.side === 'Black' ? gameParams.player_1 : gameParams.player_2;
  return (
    <div className="rounded play-area">
      {
        (haveTurn(redPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      }
      {
        gameParams.is_timed ? (
          <Timer
            moveTimer={gameParams.move_timer}
            gameTimer={gameParams.game_timer}
            isPause={!(haveTurn(redPlayer.user.pk))}
            style={{ top: '60px' }}
          />
        ) : ''
      }
      <HitPiece hitPieces={redHitPieces} />
      <Board historyMode={historyMode} />
      <HitPiece hitPieces={blackHitPieces} />
      {
        gameParams.is_timed ? (
          <Timer
            moveTimer={gameParams.move_timer}
            gameTimer={gameParams.game_timer}
            isPause={!(haveTurn(blackPlayer.user.pk))}
            style={{ bottom: '60px' }}
          />
        ) : ''
      }
      {
        (haveTurn(blackPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      }
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
    </div>
  );
};

export default PlayArea;
