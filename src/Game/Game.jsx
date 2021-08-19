import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button } from 'react-bootstrap';
import Chat from './Chat';
import PlayArea from './PlayArea';
import './Game.scss';

const Game = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 880px)' });
  document.body.style.backgroundColor = '#be342d';
  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <PlayArea />
        </div>
        <div className={`${!isTablet ? 'collapse show col-md-4' : 'collapse overlay-chatbox'}`} id="collapse-coloumn">
          <Chat />
        </div>
      </div>
      {
        isTablet ? (
          <Button
            className="custom-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-coloumn"
          >
            <i className="fas fa-comment" />
          </Button>
        ) : ''
      }

    </>
  );
};

export default Game;
