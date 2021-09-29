/* eslint-disable camelcase */
import React from 'react';

import PropTypes from 'prop-types';
import './GameList.scss';
import { Link, useHistory } from 'react-router-dom';

const GameList = ({ type, games, username }) => {
  const getPlayerName = (playerName) => (playerName === username ? 'Me' : playerName);
  const history = useHistory();
  return (
    <div className={`row position-relative m-3 game ${type === 'All Time' && 'justify-content-center'}`}>
      <h4 className="game-heading">{`My ${type} Games`}</h4>
      {
        games.length !== 0
          ? games.map(({
            id, player_1, player_2, is_rated, is_timed, move_timer, game_timer, winner, is_active,
          }) => (
            <div
              className="col-md-2 col-sm-4 col-6 border m-3 p-3 game-card"
              key={id}
            >
              <Link to={`/profile/${player_1.profile.user.username}`} className="profile-link">
                <p className="text-center">
                  {`${getPlayerName(player_1.profile.user.username)}(${player_1.profile.rating}) 
                  ${!is_active && player_1.profile.user.username === winner ? 'winner' : ''}`}
                </p>
              </Link>

              <p className="text-center"> vs </p>

              {
                player_2 ? (
                  <Link to={`/profile/${player_2.profile.user.username}`} className="profile-link">
                    <p className="text-center">
                      {`${getPlayerName(player_2.profile.user.username)}(${player_2.profile.rating})
                      ${!is_active && player_2.profile.user.username === winner ? 'winner' : ''}`}
                    </p>
                  </Link>
                ) : (
                  <p className="text-center">
                    {player_1.profile.user.username === username ? 'waiting for user!' : 'you can join'}
                  </p>
                )
              }
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
