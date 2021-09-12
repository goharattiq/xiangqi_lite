import React from 'react';

import PropTypes from 'prop-types';
import './Spot.scss';

const Spot = ({ visiblity, id }) => (
  <div
    id={id}
    className="spot"
    style={{ visibility: visiblity }}
  />
);

Spot.propTypes = {
  visiblity: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Spot;
