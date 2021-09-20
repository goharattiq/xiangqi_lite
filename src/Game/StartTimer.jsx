import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { startTimer } from '../redux/game/actions';
import { START_TIME } from '../utils/constants';
import './StartTimer.scss';

const StartTimer = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(START_TIME);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(timeInterval);
      dispatch(startTimer(false));
    }
    return () => (clearInterval(timeInterval));
  });
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 spinner-screen">
      <div className="timer-box d-flex justify-content-center align-items-center position-fixed">
        Game starts in
        {' '}
        {timer}
        {' '}
        sec...
      </div>
    </div>
  );
};

export default StartTimer;
