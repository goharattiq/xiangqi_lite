/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './History.scss';

const History = ({ history, clickHandler, setHistoryMode }) => {
  const [pointer, setPointer] = useState(history.length);

  return (
    <div className="d-flex history-position">
      <Button className="custom-color me-2"><i className="fas fa-chevron-left" /></Button>
      <p className="pt-3">{pointer}</p>
      <Button className="btn custom-color ms-2"><i className="fas fa-chevron-left" /></Button>
    </div>
  );
};

History.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
  setHistoryMode: PropTypes.func.isRequired,
};

export default History;
