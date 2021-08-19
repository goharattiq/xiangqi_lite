import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import GameParams from './GameParams';
import './Lobby.scss';

const Lobby = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const [overlayDiv, setOverlayDiv] = useState(false);
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setOverlayDiv(!overlayDiv); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {overlayDiv ? <GameParams setOverlayDiv={setOverlayDiv} /> : ''}
    </>
  );
};

export default Lobby;
