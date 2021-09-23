import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { waitTimer } from '../../redux/game/actions';
import { GAME_RESTART_TIMEOUT_MINUTES } from '../../utilis/constants';
import './WaitTimer.scss';

const WaitTimer = ({ waitTimeOn }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(GAME_RESTART_TIMEOUT_MINUTES);
  useEffect(() => {
    let timeInterval;
    if (waitTimeOn) {
      timeInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(timeInterval);
        dispatch(waitTimer(false));
      }
    }
    return () => {
      if (waitTimeOn) {
        clearInterval(timeInterval);
      }
    };
  });
  return (
    waitTimeOn
      ? (
        <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 timer-screen">
          <div className="timer-box d-flex justify-content-center align-items-center position-fixed">
            {`Game starts in ${timer} sec...`}
          </div>
        </div>
      ) : ''
  );
};

WaitTimer.propTypes = {
  waitTimeOn: PropTypes.bool.isRequired,
};

export default WaitTimer;
