import React from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AnnounceWinner.scss';

const AnnounceWinner = ({ player }) => (
  <div className="position-absolute w-100 h-100 overlay-div">
    <div className="position-absolute bg-white pt-4 winner">
      <p className="text-center">
        {player.user ? player.user.username : 'You'}
        {' '}
        won
      </p>
      <Link to="/lobby">
        <Button
          className="position-relative m-4 form-button"
        >
          Back To Lobby
        </Button>
      </Link>
    </div>
  </div>
);

AnnounceWinner.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

export default AnnounceWinner;
