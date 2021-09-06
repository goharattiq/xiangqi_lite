import React from 'react';

import PropTypes from 'prop-types';
import './Player.scss';

const Player = ({ style }) => (
  <div className="player" style={style}>
    <div className="avatar" />
  </div>
);

Player.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
};

export default Player;
