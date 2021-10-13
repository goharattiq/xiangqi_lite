import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { GameParams } from '../Lobby';
import { fetechActiveGames, fetechSpectateGames } from '../redux/lobby/thunk';
import GameList from '../shared/GameList';
import Spinner from '../shared/Spinner';
import { BACKGROUND } from '../utilis/constants';
import './Lobby.scss';

const Lobby = ({ activeGames, spectateGames, username }) => {
  const [overlayDiv, setOverlayDiv] = useState(false);
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setOverlayDiv(!overlayDiv); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {overlayDiv && <GameParams setOverlayDiv={setOverlayDiv} />}
      <GameList type="Active" games={activeGames} username={username} />
      <GameList type="Spectate" games={spectateGames} username={username} />
    </>
  );
};

const LobbyWithSpinner = Spinner(Lobby);

const LobbyContainer = () => {
  document.body.style.backgroundColor = BACKGROUND;
  const dispatch = useDispatch();
  const { activeGames, spectateGames, username } = useSelector(({ lobby, auth }) => ({
    activeGames: lobby.activeGames,
    spectateGames: lobby.spectateGames,
    username: auth && auth.user ? auth.user.username : '',
  }));
  useEffect(() => {
    dispatch(fetechActiveGames());
    dispatch(fetechSpectateGames());
  }, []);
  return (
    <LobbyWithSpinner
      isLoading={!activeGames || !spectateGames || !username}
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
