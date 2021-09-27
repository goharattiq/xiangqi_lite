import React from 'react';

import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import './Player.scss';
import { Link } from 'react-router-dom';

const Player = ({ player }) => (
  player
    && (
      <div className="player">
        <Avatar
          name={player.profile.user.username}
          src={player.profile.photo}
          className="avatar"
          color={player.side}
        />
        <Link to={`/profile/${player.profile.user.username}`} className="profile-link">
          <p className="ps-2">{player.profile.user.username}</p>
        </Link>
      </div>
    )
);

Player.propTypes = {
  // eslint-disable-next-line react/require-default-props
  player: PropTypes.object,
};

export default Player;
