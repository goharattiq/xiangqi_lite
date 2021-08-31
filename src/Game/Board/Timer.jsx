/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.scss';

const Timer = ({
  moveTimer, gameTimer, isPause, style,
}) => {
  const [timer, setTimer] = useState({
    moveInterval: moveTimer * 60,
    gameInterval: gameTimer * 60,
  });
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
    if (moveInterval === 0) {
      setTimer({
        ...timer,
      });
      pauseTimer(timeInterval);
    }
    if (isPause) {
      setTimer({
        ...timer,
        moveInterval: moveTimer * 60,
      });
      pauseTimer(timeInterval);
    }
    return () => { pauseTimer(timeInterval); };
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
  moveTimer: PropTypes.number.isRequired,
  gameTimer: PropTypes.number.isRequired,
  isPause: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
};

export default Timer;
