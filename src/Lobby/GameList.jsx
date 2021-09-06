/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import PropTypes from 'prop-types';

import { socketEnterGame } from '../socketio/gameSocketio';
import './GameList.scss';

const GameList = ({ type, games, username }) => {
  const getPlayerName = (playerName) => (playerName === username ? 'Me' : playerName);
  return (
    <div className="m-3 games row">
      <h4>{`My ${type} Games`}</h4>
      {
        games.length !== 0
          ? games.map(({
            id, player_1, player_2, is_rated, is_timed, move_timer, game_timer,
          }) => (
            <div
              className="col-2 border m-3  p-3"
              key={id}
            >
              <p className="text-center">
                {`${getPlayerName(player_1.user.username)}(${player_1.rating})`}
              </p>
              <p className="text-center"> vs </p>
              <p className="text-center">
                {`${getPlayerName(player_2.user.username)}(${player_2.rating})`}
              </p>

              <div className="d-flex justify-content-between">
                <p>
                  {`${is_rated ? 'Rated' : 'Unrated'}`}
                </p>
                <p>
                  {`${is_timed ? `${move_timer}/${game_timer}` : '-'}`}
                </p>
              </div>

              <p
                className="game-link text-end fs-6 m-1"
                type="button"
                onClick={() => {
                  socketEnterGame(id);
                }}
              >
                {type === 'Active' ? 'join' : 'view'}
                {id}
              </p>
            </div>
          ))
          : <p>{`No ${type} Games Available`}</p>
      }
    </div>
  );
};

GameList.propTypes = {
  type: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

export default GameList;
