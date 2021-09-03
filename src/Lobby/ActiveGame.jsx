/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector } from 'react-redux';
import { socketEnterGame } from '../scoketio/gameSocketio';

const ActiveGame = () => {
  const activeGames = useSelector(({ game }) => (game.activeGames));
  return (
    <div>
      <h2>My Active Games</h2>
      {
        activeGames.length !== 0
          ? activeGames.map((game) => (
            <div
              key={game.id}
              onClick={() => {
                socketEnterGame(game.id);
              }}
            >
              <p>{game.id}</p>
            </div>
          ))
          : <p>No Active Games</p>
      }
    </div>
  );
};

export default ActiveGame;
