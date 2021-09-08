import React from 'react';

import PropTypes from 'prop-types';
import './Player.scss';

const Player = ({ player, style }) => (
  <div className="player" style={style}>
    <img src={player.photo} alt={player.user.username} />
  </div>
);

Player.propTypes = {
  style: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};

export default Player;
