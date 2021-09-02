import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historyMoveBack, historyMoveForward } from '../redux/game/actions';
import Board from './Board/Board';
import HitPiece from './Board/HitPiece';
import History from './Board/History';
import { whichSide } from '../utils/pieceMove';
import './PlayArea.scss';
import Timer from './Board/Timer';
import Player from './Board/Player';
import { socketLeaveGame } from '../scoketio/socketio';
import AnnounceWinner from './Board/AnnounceWinner';

const PlayArea = () => {
  const [historyMode, setHistoryMode] = useState(false);
  const {
    hitPiece, history, gameParams, playerTurn, userID, winner,
  } = useSelector(({ game, auth }) => ({
    hitPiece: game.hitPiece,
    history: game.history,
    winner: game.winner,
    gameParams: game.params,
    playerTurn: game.params.player_turn,
    userID: auth.user.pk,
  }));
  const redHitPieces = hitPiece.filter((piece) => whichSide(piece.name));
  const blackHitPieces = hitPiece.filter((piece) => !whichSide(piece.name));
  const dispatch = useDispatch();
  useEffect(() => () => {
    socketLeaveGame(gameParams.id, dispatch);
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
  const haveTurn = (turn) => (turn === playerTurn);
  const redPlayer = gameParams.player_1.side === 'Red' ? gameParams.player_1 : gameParams.player_2;
  const blackPlayer = gameParams.player_1.side === 'Black' ? gameParams.player_1 : gameParams.player_2;
  return (
    <div className="rounded play-area">
      {/* {
        (haveTurn(redPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
      <div className="top-bar">
        <Player style={{ top: '20px' }} />
        {
        gameParams.is_timed ? (
          <Timer
            moveTimer={gameParams.move_timer}
            gameTimer={gameParams.game_timer}
            isPause={!(haveTurn(redPlayer.user.pk)) || gameParams.connected_player < 2}
            style={{ bottom: '40px' }}
            userID={userID}
          />
        ) : ''
      }
        <HitPiece hitPieces={redHitPieces} style={{ bottom: '100px' }} />
      </div>
      <Board historyMode={historyMode} />
      <div className="bottom-bar">
        <HitPiece hitPieces={blackHitPieces} style={{ top: '5px' }} />
        {
          gameParams.is_timed ? (
            <Timer
              moveTimer={gameParams.move_timer}
              gameTimer={gameParams.game_timer}
              isPause={!(haveTurn(blackPlayer.user.pk)) || gameParams.connected_player < 2}
              style={{ bottom: '60px' }}
              userID={userID}
            />
          ) : ''
        }
        {/* {
        (haveTurn(blackPlayer.user.pk))
          ? <i className="fas fa-arrow-right" /> : ''
      } */}
        <Player style={{ bottom: '105px' }} />
      </div>
      <History history={history} clickHandler={historyHandler} setHistoryMode={setHistoryMode} />
      {
        winner ? (
          <AnnounceWinner
            // eslint-disable-next-line no-nested-ternary
            player={winner === userID ? {} : winner === redPlayer.user.pk ? redPlayer : blackPlayer}
          />
        ) : ''
      }
    </div>
  );
};

export default PlayArea;
