import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { PlayArea, Chat } from '../components/Game';
import Spinner from '../components/shared/Spinner';
import { socketEnterGame } from '../socketio/gameSocketio';
import history from '../utilis/history';
import './styles/Game.scss';

const Game = ({ isTablet }) => (
  <>
    <div className="row w-100">
      <div className="col-lg-8 col-md-12 ms-2">
        <PlayArea />
      </div>
      <div className={`${!isTablet ? 'collapse show col-md-3' : 'collapse overlay-chatbox'}`} id="collapse-coloumn">
        <Chat />
      </div>
    </div>
    <Button
      className="custom-btn"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse-coloumn"
    >
      <i className="fas fa-comment" />
    </Button>
  </>
);

const GameWithContainer = Spinner(Game);

const GameContainer = () => {
  const { gameId } = useParams();
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
  const { gameParams } = useSelector(({ game }) => ({ gameParams: game.params }));
  document.body.style.backgroundColor = '#be342d';

  useEffect(() => {
    if ((!gameParams || !gameParams.id) || (history.location.pathname !== `/game/${gameParams.id}`)) {
      socketEnterGame(gameId, history);
    }
  }, []);
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
