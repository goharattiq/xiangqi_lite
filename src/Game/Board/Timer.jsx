import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { socketEndGame } from '../../socketio/gameSocketio';
import './Timer.scss';

const Timer = ({
  playerTimer, isPause, style, userID
}) => {
  const { move_time, game_time } = playerTimer;
  const [timer, setTimer] = useState({
    moveInterval: move_time < game_time ?  move_time * 60 : game_time * 60,
    gameInterval: game_time * 60,
  });
  const gameParams = useSelector(({ game }) => (game.params));
  const { moveInterval, gameInterval } = timer;
  const pauseTimer = (interval) => {
    clearInterval(interval);
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimer({
        moveInterval: moveInterval - 1,
        gameInterval: gameInterval - 1,
      });
    }, 1000);
    if (!isPause && (moveInterval === 0 || gameInterval === 0)) {
      pauseTimer(timeInterval);
      if (gameParams.player_turn === userID) {
      // eslint-disable-next-line camelcase
        const { player_1, player_2 } = gameParams;
        socketEndGame(gameParams.id, {
          player_1,
          player_2,
        }, gameParams.player_turn, 
        'END_TIME', 
        gameParams.is_rated);
      }
    }
    if (isPause) {
      setTimer({
        ...timer,
        moveInterval: move_time < game_time ? move_time * 60: game_time * 60,
      });
      pauseTimer(timeInterval);
    }
    return () => { 
      pauseTimer(timeInterval); 
    };
  }, [moveInterval, isPause]);

  const timeFormatter = (string) => (new Array(2).join('0') + string).slice(-2);
  return (
    <div className="timer" style={style}>
      <p>
        {`${timeFormatter((Math.floor(moveInterval / 60)).toString())} :
          ${timeFormatter(Math.floor(moveInterval % 60).toString())}`}
      </p>
      <p>
        {`${timeFormatter((Math.floor(gameInterval / 60)).toString())} :
          ${timeFormatter(Math.floor(gameInterval % 60).toString())}`}
      </p>
    </div>
  );
};

Timer.propTypes = {
  playerTimer: PropTypes.object.isRequired,
  isPause: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  userID: PropTypes.number.isRequired,
};

export default Timer;
