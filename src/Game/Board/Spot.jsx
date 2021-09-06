import React from 'react';

import PropTypes from 'prop-types';
import './Spot.scss';

const Spot = ({ visiblity, id }) => (
  <div
    className="spot"
    style={{ visibility: visiblity }}
    id={id}
  />
);

Spot.propTypes = {
  visiblity: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Spot;
