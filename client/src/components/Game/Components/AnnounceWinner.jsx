import React from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/AnnounceWinner.scss';

const AnnounceWinner = ({ player, username, announce }) => (
  announce
      && (
        <div className="position-absolute top-0 start-0 w-100 h-100 overlay-div">
          <div className="position-absolute bg-white pt-4 winner">
            <p className="text-center">
              {`${player.profile.user.username === username ? 'You' : player.profile.user.username} Won`}
            </p>
            <Link to="/lobby">
              <Button className="position-relative back-button my-3">
                Back To Lobby
              </Button>
            </Link>
          </div>
        </div>
      )
);

AnnounceWinner.propTypes = {
  player: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  announce: PropTypes.bool.isRequired,
};

export default AnnounceWinner;
