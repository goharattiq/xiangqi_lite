/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector } from 'react-redux';
import { socketEnterGame } from '../scoketio/socketio';

const SpectateGame = () => {
  const spectateGames = useSelector(({ game }) => (game.spectateGames));
  return (
    <div>
      <h2>My Spectate Games</h2>
      {
        spectateGames.length !== 0
          ? spectateGames.map((game) => (
            <div key={game.id} onClick={() => { socketEnterGame(game.id); }}>
              <p>{game.side}</p>
            </div>
          ))
          : <p>No Games for Spectate</p>
      }
    </div>
  );
};

export default SpectateGame;
