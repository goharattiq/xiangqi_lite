/* eslint-disable camelcase */
import React from 'react';

import PropTypes from 'prop-types';
import './GameList.scss';
import { Link, useHistory } from 'react-router-dom';

const GameList = ({ type, games, username }) => {
  const getPlayerName = (playerName) => (playerName === username ? 'Me' : playerName);
  const history = useHistory();
  return (
    <div className="m-3 games row">
      <h4>{`My ${type} Games`}</h4>
      {
        games.length !== 0
          ? games.map(({
            id, player_1, player_2, is_rated, is_timed, move_timer, game_timer,
          }) => (
            <div
              className="col-md-2 col-sm-4 col-5 border m-3  p-3"
              key={id}
            >
              <p className="text-center">
                <Link to={`/profile/${player_1.user.username}`} className="profile-link">
                  {`${getPlayerName(player_1.user.username)}(${player_1.rating})`}
                </Link>
              </p>
              <p className="text-center"> vs </p>
              <p className="text-center">
                <Link to={`/profile/${player_2.user.username}`} className="profile-link">
                  {`${getPlayerName(player_2.user.username)}(${player_2.rating})`}
                </Link>
              </p>

              <div className="d-flex justify-content-between">
                <p>
                  {`${is_rated ? 'Rated' : 'Unrated'}`}
                </p>
                <p>
                  {`${is_timed ? `${move_timer}/${game_timer}` : '-'}`}
                </p>
              </div>

              <button
                className="game-link"
                type="button"
                onClick={() => {
                  history.push(`/game/${id}`);
                }}
              >
                {type === 'Active' ? 'join' : 'view'}
              </button>
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
