import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { historyMoveBack, historyMoveForward, toggleHistoryMode } from '../redux/game/actions';
import { socketLeaveGame } from '../socketio/gameSocketio';
import { BLACK, RED } from '../utilis/constants';
import { whichSide } from '../utilis/pieceMove';
import Board from './Board/Board';
import AnnounceWinner from './Components/AnnounceWinner';
import History from './Components/History';
import HitPiece from './Components/HitPiece';
import Player from './Components/Player';
import Timer from './Components/Timer';
import WaitTimer from './Components/WaitTimer';
import './PlayArea.scss';

const PlayArea = () => {
  const dispatch = useDispatch();
  const {
    hitPiece,
    history,
    gameParams,
    playerTurn,
    user,
    winner,
    waitTime,
    historyMode,
  } = useSelector(({ game, auth }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
    winner: game.winner,
    gameParams: game.params,
    playerTurn: game.params.player_turn,
    user: auth.user,
    waitTime: game.waitTime,
    historyMode: game.historyMode,
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
      dispatch(toggleHistoryMode(true));
      // eslint-disable-next-line no-unused-expressions
      isNext ? dispatch(historyMoveForward(history[pointer - 1]))
        : dispatch(historyMoveBack(history[pointer]));
      if (pointer === history.length) {
        dispatch(toggleHistoryMode(false));
      }
    } else {
      dispatch(toggleHistoryMode(false));
    }
  };
  const bothConnected = (redPlayer, blackPlayer) => (
    (!!redPlayer && !!blackPlayer)
    && (redPlayer.is_connected && blackPlayer.is_connected)
  );
  const haveTurn = (turn) => (turn === playerTurn);
  let redHitPieces = hitPiece.filter((piece) => whichSide(piece.name) === RED);
  let blackHitPieces = hitPiece.filter((piece) => whichSide(piece.name) === BLACK);
  let redPlayer = gameParams && (gameParams.player_1.side === RED
    ? gameParams.player_1 : gameParams.player_2);
  let blackPlayer = gameParams && (gameParams.player_1.side === BLACK
    ? gameParams.player_1 : gameParams.player_2);
  const isRotated = redPlayer && user.pk === redPlayer.profile.user.pk;
  if (isRotated) {
    [blackPlayer, redPlayer] = [redPlayer, blackPlayer];
    [blackHitPieces, redHitPieces] = [redHitPieces, blackHitPieces];
  }
  return (
    <div className="rounded play-area">
      <WaitTimer
        waitTimeOn={waitTime && bothConnected(redPlayer, blackPlayer)}
      />
      <div className="bar">
        <Player style={{ top: '30px' }} player={redPlayer} />
        <HitPiece hitPieces={redHitPieces} style={{ bottom: '60px' }} />
        <Timer
          showTimer={!!gameParams && gameParams.is_timed && gameParams.is_active
            && bothConnected(redPlayer, blackPlayer)}
          playerTimer={redPlayer && gameParams.is_timed ? redPlayer.time
            : { move_time: 0, game_time: 0 }}
          isPause={waitTime || (redPlayer && !(haveTurn(redPlayer.profile.user.pk)))
            || !bothConnected(redPlayer, blackPlayer)}
          style={{ bottom: '115px' }}
          userID={user.pk}
        />
      </div>
      <Board historyMode={historyMode} isRotate={isRotated} />
      <div className="bottom-bar">
        <Player style={{ top: '10px' }} player={blackPlayer} />
        <HitPiece hitPieces={blackHitPieces} style={{ bottom: '80px' }} />
        <Timer
          showTimer={!!gameParams && gameParams.is_timed && gameParams.is_active
            && bothConnected(redPlayer, blackPlayer)}
          playerTimer={blackPlayer && gameParams.is_timed ? blackPlayer.time
            : { move_time: 0, game_time: 0 }}
          isPause={waitTime || (blackPlayer && !(haveTurn(blackPlayer.profile.user.pk)))
            || !bothConnected(redPlayer, blackPlayer)}
          style={{ bottom: '135px' }}
          userID={user.pk}
        />
      </div>
      <History
        history={history}
        clickHandler={historyHandler}
        historyMode={historyMode}
      />
      <AnnounceWinner
        announce={!!winner}
        player={redPlayer && winner === redPlayer.profile.user.username ? redPlayer : blackPlayer}
        username={user.username}
      />
    </div>
  );
};

export default PlayArea;
