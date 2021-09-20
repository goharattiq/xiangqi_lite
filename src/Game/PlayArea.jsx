import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { historyMoveBack, historyMoveForward } from '../redux/game/actions';
import { socketLeaveGame } from '../socketio/gameSocketio';
import { BLACK_STR, RED_STR } from '../utils/constants';
import { whichSide } from '../utils/pieceMove';
import Board from './Board/Board';
import AnnounceWinner from './Components/AnnounceWinner';
import History from './Components/History';
import HitPiece from './Components/HitPiece';
import Player from './Components/Player';
import StartTimer from './Components/StartTimer';
import Timer from './Components/Timer';
import './PlayArea.scss';

const PlayArea = () => {
  const dispatch = useDispatch();
  const [historyMode, setHistoryMode] = useState(false);
  const {
    hitPiece,
    history,
    gameParams,
    playerTurn,
    user,
    winner,
    startTimer,
  } = useSelector(({ game, auth }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
    winner: game.winner,
    gameParams: game.params,
    playerTurn: game.params.player_turn,
    user: auth.user,
    startTimer: game.startTime,
  }));
  useEffect(() => {
    if (!localStorage.getItem('gameID')) {
      localStorage.setItem('gameID', gameParams.id);
    }
    return () => {
      socketLeaveGame(gameParams.id, dispatch);
    };
  }, []);
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
  const bothConnected = (redPlayer, blackPlayer) => (
    (redPlayer && blackPlayer)
    && (redPlayer.is_connected && blackPlayer.is_connected)
  );
  const haveTurn = (turn) => (turn === playerTurn);
  let redHitPieces = hitPiece.filter((piece) => whichSide(piece.name));
  let blackHitPieces = hitPiece.filter((piece) => !whichSide(piece.name));
  let redPlayer = gameParams && (gameParams.player_1.side === RED_STR
    ? gameParams.player_1 : gameParams.player_2);
  let blackPlayer = gameParams && (gameParams.player_1.side === BLACK_STR
    ? gameParams.player_1 : gameParams.player_2);
  const isRotated = redPlayer && user.pk === redPlayer.profile.user.pk;
  if (isRotated) {
    [blackPlayer, redPlayer] = [redPlayer, blackPlayer];
    [blackHitPieces, redHitPieces] = [redHitPieces, blackHitPieces];
  }
  return (
    <div className="rounded play-area">
      {
        startTimer && bothConnected(redPlayer, blackPlayer) ? <StartTimer /> : ''
      }
      {/* {
        (haveTurn(redPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
      <div className="bar">
        <Player style={{ top: '20px' }} player={redPlayer} />
        {
          gameParams && gameParams.is_timed && gameParams.is_active
          && bothConnected(redPlayer, blackPlayer) ? (
            <Timer
              playerTimer={redPlayer.time}
              isPause={startTimer || !(haveTurn(redPlayer.profile.user.pk))
                || !bothConnected(redPlayer, blackPlayer)}
              style={{ bottom: '60px' }}
              userID={user.pk}
            />
            ) : ''
        }
        <HitPiece hitPieces={redHitPieces} style={{ bottom: '120px' }} />
      </div>
      <Board historyMode={historyMode} isRotate={isRotated} />
      <div className="bottom-bar">
        <HitPiece hitPieces={blackHitPieces} style={{ top: '5px' }} />
        {
          gameParams && gameParams.is_timed && gameParams.is_active
          && bothConnected(redPlayer, blackPlayer) ? (
            <Timer
              playerTimer={blackPlayer.time}
              isPause={startTimer || !(haveTurn(blackPlayer.profile.user.pk))
                || !bothConnected(redPlayer, blackPlayer)}
              style={{ bottom: '60px' }}
              userID={user.pk}
            />
            ) : ''
        }
        {/* {
        (haveTurn(blackPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
        <Player style={{ bottom: '110px' }} player={blackPlayer} />
      </div>
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
      {
        winner ? (
          <AnnounceWinner
            player={winner === redPlayer.profile.user.username ? redPlayer : blackPlayer}
            username={user.username}
          />
        ) : ''
      }
    </div>
  );
};

export default PlayArea;
