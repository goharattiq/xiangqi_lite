import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Components/Spinner';
import { fetechedActiveGames, fetechedSpectateGames } from '../redux/game/thunk';
import GameList from './GameList';
import GameParams from './GameParams';
import './Lobby.scss';

const Lobby = ({ activeGames, spectateGames, username }) => {
  const [overlayDiv, setOverlayDiv] = useState(false);
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setOverlayDiv(!overlayDiv); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {overlayDiv ? <GameParams setOverlayDiv={setOverlayDiv} /> : ''}
      <GameList type="Active" games={activeGames} username={username} />
      <GameList type="Spectate" games={spectateGames} username={username} />
    </>
  );
};

const LobbyWithSpinner = Spinner(Lobby);

const LobbyContainer = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const { activeGames, spectateGames, username } = useSelector(({ game, auth }) => ({
    activeGames: game.activeGames,
    spectateGames: game.spectateGames,
    username: auth.user.username,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetechedActiveGames());
    dispatch(fetechedSpectateGames());
  }, []);
  return (
    <LobbyWithSpinner
      isLoading={!activeGames.length || !spectateGames.length}
      activeGames={activeGames}
      spectateGames={spectateGames}
      username={username}
    />
  );
};

Lobby.propTypes = {
  activeGames: PropTypes.array.isRequired,
  spectateGames: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

export default LobbyContainer;
