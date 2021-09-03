import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetechedActiveGames, fetechedSpectateGames } from '../redux/game/thunk';
import GameParams from './GameParams';
import ActiveGame from './ActiveGame';
import SpectateGame from './SpectateGame';
import './Lobby.scss';

const Lobby = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const dispatch = useDispatch();
  const [overlayDiv, setOverlayDiv] = useState(false);
  useEffect(() => {
    dispatch(fetechedActiveGames());
    dispatch(fetechedSpectateGames());
  }, []);
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setOverlayDiv(!overlayDiv); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {overlayDiv ? <GameParams setOverlayDiv={setOverlayDiv} /> : ''}
      <ActiveGame />
      <SpectateGame />
    </>
  );
};

export default Lobby;
