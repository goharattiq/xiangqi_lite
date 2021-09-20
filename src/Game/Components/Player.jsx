import React from 'react';

import PropTypes from 'prop-types';
import './Player.scss';
import { Link } from 'react-router-dom';

const Player = ({ player, style }) => (
  player
    ? (
      <div className="player" style={style}>
        <img src={player.profile.photo} alt={player.profile.user.username} className="avatar" />
        <Link to={`/profile/${player.profile.user.username}`} className="profile-link">
          <p className="ps-2">{player.profile.user.username}</p>
        </Link>
      </div>
    ) : ''
);

Player.propTypes = {
  style: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  player: PropTypes.object,
};

export default Player;
