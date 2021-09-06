import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Button } from 'react-bootstrap';
import Chat from './Chat';
import PlayArea from './PlayArea';
import Spinner from '../Components/Spinner';
import './Game.scss';

const Game = ({ isTablet }) => (
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

const GameWithContainer = Spinner(Game);

const GameContainer = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 880px)' });
  document.body.style.backgroundColor = '#be342d';
  const gameParams = useSelector(({ game }) => (game.params));
  return (
    <GameWithContainer
      isLoading={!gameParams || !gameParams.id}
      isTablet={isTablet}
    />
  );
};

Game.propTypes = {
  isTablet: PropTypes.bool.isRequired,
};

export default GameContainer;
