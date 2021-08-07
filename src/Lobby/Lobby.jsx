import React from 'react';
import { Button } from 'react-bootstrap';
import './Lobby.scss';

const Lobby = () => (
  <>
    <Button className="position-absolute m-2 new-game">
      <i className="fas fa-plus pe-2" />
      New Game
    </Button>
  </>
);

export default Lobby;
