import React from 'react';
import Chat from './Chat';
import PlayArea from './PlayArea';
import './Game.scss';

const Game = () => {
  document.body.style.backgroundColor = '#be342d';
  return (
    <div className="row">
      <div className="col">
        <PlayArea />
      </div>
      <div className="col">
        <Chat />
      </div>
    </div>
  );
};

export default Game;
