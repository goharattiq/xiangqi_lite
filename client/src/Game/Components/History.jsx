import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './History.scss';

const History = ({ history, clickHandler, historyMode }) => {
  const [historyManager, setHistoryManager] = useState({
    pointer: history.length,
    historyType: false,
  });
  const { pointer, historyType } = historyManager;
  useEffect(() => {
    if (!historyMode) {
      setHistoryManager({
        ...historyManager,
        pointer: history.length,
      });
    }
  }, [history]);
  useEffect(() => {
    clickHandler(pointer, historyType);
  }, [pointer, historyType]);
  return (
    <div className="d-flex justify-content-center position-relative history">
      <Button
        className="custom-color me-2"
        onClick={() => {
          if (pointer > 0) {
            setHistoryManager({
              pointer: pointer - 1,
              historyType: false,
            });
          }
        }}
      >
        <i className="fas fa-chevron-left" />
      </Button>
      <p className="pt-1">{pointer}</p>
      <Button
        className="btn custom-color ms-2"
        onClick={() => {
          if (pointer < history.length) {
            setHistoryManager({
              pointer: pointer + 1,
              historyType: true,
            });
          }
        }}
      >
        <i className="fas fa-chevron-right" />
      </Button>
    </div>
  );
};

History.propTypes = {
  history: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
  historyMode: PropTypes.bool.isRequired,
};

export default History;
