import React from 'react';
import Chat from './Chat';
import PlayArea from './PlayArea';
import './Game.scss';

const Game = () => {
  document.body.style.backgroundColor = '#be342d';
  return (
    <div className="row">
      <div className="col-md-8 col-sm-12 col-xs-12">
        <PlayArea />
      </div>
      <div className="col-md-4 chat-area">
        <Chat />
      </div>
    </div>
  );
};

export default Game;
