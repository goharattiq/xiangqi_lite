import React from 'react';

import PropTypes from 'prop-types';
import './Player.scss';
import { Link } from 'react-router-dom';

const Player = ({ player, style }) => (
  <div className="player" style={style}>
    <img src={player.photo} alt={player.user.username} />
    <Link to={`/profile/${player.user.username}`} className="profile-link">
      <p className="ps-2">{player.user.username}</p>
    </Link>
  </div>
);

Player.propTypes = {
  style: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};

export default Player;
