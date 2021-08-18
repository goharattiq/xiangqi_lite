import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './History.scss';

const History = ({ history, clickHandler }) => {
  const [pointer, setPointer] = useState(history.length);
  const [historyType, setHistoryType] = useState(false);
  useEffect(() => {
    setPointer(history.length);
  }, [history]);
  useEffect(() => {
    clickHandler(pointer, historyType);
  }, [pointer, historyType]);
  return (
    <div className="d-flex history-position">
      <Button
        className="custom-color me-2"
        onClick={() => {
          if (pointer > 0) {
            setPointer(pointer - 1);
            setHistoryType(false);
          }
        }}
      >
        <i className="fas fa-chevron-left" />
      </Button>
      <p className="pt-3">{pointer}</p>
      <Button
        className="btn custom-color ms-2"
        onClick={() => {
          if (pointer < history.length) {
            setPointer(pointer + 1);
            setHistoryType(true);
          }
        }}
      >
        <i className="fas fa-chevron-right" />
      </Button>
    </div>
  );
};

History.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default History;
