import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetechedActiveGames, fetechedSpectateGames } from '../redux/game/thunk';
import GameParams from './GameParams';
import GameList from './GameList';
import './Lobby.scss';

const Lobby = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const { activeGames, spectateGames, username } = useSelector(({ game, auth }) => ({
    activeGames: game.activeGames,
    spectateGames: game.spectateGames,
    username: auth.user.username,
  }));
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
      <GameList type="Active" games={activeGames} username={username} />
      <GameList type="Spectate" games={spectateGames} username={username} />
    </>
  );
};

export default Lobby;
