import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { historyMoveBack, historyMoveForward } from '../redux/game/actions';
import { socketLeaveGame } from '../socketio/gameSocketio';
import { whichSide } from '../utils/pieceMove';
import AnnounceWinner from './Board/AnnounceWinner';
import Board from './Board/Board';
import History from './Board/History';
import HitPiece from './Board/HitPiece';
import Player from './Board/Player';
import Timer from './Board/Timer';
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
  } = useSelector(({ game, auth }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
    winner: game.winner,
    gameParams: game.params,
    playerTurn: game.params.player_turn,
    user: auth.user,
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
  const bothConnected = (redPlayer,blackPlayer)=> ((redPlayer.is_connected && blackPlayer.is_connected))
  const haveTurn = (turn) =>  (turn === playerTurn);
  const redHitPieces = hitPiece.filter((piece) => whichSide(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !whichSide(piece.name));
  const redPlayer = gameParams && (gameParams.player_1.side === 'Red' ? gameParams.player_1 : gameParams.player_2);
  const blackPlayer = gameParams && (gameParams.player_1.side === 'Black' ? gameParams.player_1 : gameParams.player_2);
  return (
    <div className="rounded play-area">
      {/* {
        (haveTurn(redPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
      <div className="bar">
        <Player style={{ top: '20px' }} player={redPlayer} />
        {
          gameParams && gameParams.is_timed && gameParams.is_active ? (
            <Timer
              playerTimer={gameParams.player_1.time}
              isPause={!(haveTurn(redPlayer.profile.user.pk)) || !bothConnected(redPlayer,blackPlayer)}
              style={{ bottom: '40px' }}
              userID={user.pk}
            />
          ) : ''
        }
        <HitPiece hitPieces={redHitPieces} style={{ bottom: '25px' }} />
      </div>
      <Board historyMode={historyMode} />
      <div className="bottom-bar">
        <HitPiece hitPieces={blackHitPieces} style={{ top: '5px' }} />
        {
          gameParams && gameParams.is_timed && gameParams.is_active ? (
            <Timer
              playerTimer={gameParams.player_2.time}
              isPause={!(haveTurn(blackPlayer.profile.user.pk)) || !bothConnected(redPlayer,blackPlayer)}
              style={{ bottom: '60px' }}
              userID={user.pk}
            />
          ) : ''
        }
        {/* {
        (haveTurn(blackPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
        <Player style={{ bottom: '60px' }} player={blackPlayer} />
      </div>
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
      {
        winner ? (
          <AnnounceWinner
            // eslint-disable-next-line no-nested-ternary
            player={winner === redPlayer.profile.user.username ? redPlayer : blackPlayer}
            username={user.username}
          />
        ) : ''
      }
    </div>
  );
};

export default PlayArea;
