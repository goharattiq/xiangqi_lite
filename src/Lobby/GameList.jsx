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
            id, player_1, player_2, is_rated, is_timed, move_timer, game_timer, winner, is_active,
          }) => (
            <div
              className="col-md-2 col-sm-4 col-5 border m-3  p-3"
              key={id}
            >
              <Link to={`/profile/${player_1.profile.user.username}`} className="profile-link">
                <p className="text-center">
                  {`${getPlayerName(player_1.profile.user.username)}(${player_1.profile.rating})`}
                </p>
              </Link>

              <p className="text-center"> vs </p>

              <Link to={`/profile/${player_2.profile.user.username}`} className="profile-link">
                <p className="text-center">
                  {`${getPlayerName(player_2.profile.user.username)}(${player_2.profile.rating})`}
                </p>
              </Link>

              <div className="d-flex justify-content-between">
                <p>
                  {`${is_rated ? 'Rated' : 'Unrated'}`}
                </p>
                <p>
                  {`${is_timed ? `${move_timer}/${game_timer}` : '-'}`}
                </p>
              </div>
              {
                is_active ? ''
                  : (
                    <div className="d-flex justify-content-between">
                      <p>
                        <Link to={`/profile/${winner}`} className="profile-link">
                          {`winner ${getPlayerName(winner)}`}
                        </Link>
                      </p>
                    </div>
                  )
}

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
