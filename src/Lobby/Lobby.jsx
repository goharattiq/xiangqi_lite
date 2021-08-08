import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import GameParams from './GameParams';
import './Lobby.scss';

const Lobby = () => {
  const [gameParam, setGameParam] = useState(false);
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setGameParam(!gameParam); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {gameParam ? <GameParams /> : ''}
    </>
  );
};

export default Lobby;
