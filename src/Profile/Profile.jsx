import React, { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../Components/Spinner';
import GameList from '../Lobby/GameList';
import { fetchAllTimeGames, fetchUserProfile } from '../redux/profile/thunk';

import './Profile.scss';

const Profile = ({
  userFullName, user, stateList, games, photo,
}) => (
  <Container className="bg-white w-75 mt-5 pb-3">
    <div>
      <div className="user-profile mt-5 ms-5">
        <img src={photo} alt={user.username} className="profile-avatar" />
        <div className="user-detail">
          <p className="user-fullname">{userFullName}</p>
          <p className="mt-5 ms-1 user-username">{user ? user.username : ''}</p>
          <Link to={`profile/edit/${user.pk}`} className="m-1">
            <i className="fas fa-edit" />
          </Link>
        </div>

      </div>
      <ul className="list-group mt-5 mb-3 user-stats">
        {
                stateList.map((state) => (
                  <li key={state.name} className="score list-group-item m-2">
                    <p className="m-0">
                      {state.name === 'Winning%' ? state.score.toFixed(2) : state.score}
                    </p>
                    <p className="m-0">{state.name}</p>
                  </li>
                ))
              }
      </ul>
      <GameList type="All Time" games={games} username={user.username} />
    </div>
  </Container>
);

const ProfileWithSpinner = Spinner(Profile);

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const callback = useCallback((id) => fetchUserProfile(id));
  useEffect(() => {
    dispatch(callback(auth.user.pk));
    dispatch(fetchAllTimeGames());
  }, [auth]);
  const {
    user,
    gamesCount,
    winsCount,
    lossesCount,
    drawCount,
    winningPercentage,
    games,
    photo,
  } = useSelector(({ profile }) => ({
    user: profile.user,
    gamesCount: profile.games_played_count,
    winsCount: profile.wins_count,
    lossesCount: profile.losses_count,
    drawCount: profile.draw_count,
    winningPercentage: profile.winning_percentage,
    games: profile.games,
    photo: profile.photo,
  }));

  const stateList = [
    { name: 'Games', score: gamesCount },
    { name: 'Wins', score: winsCount },
    { name: 'Losses', score: lossesCount },
    { name: 'Draws', score: drawCount },
    { name: 'Winning%', score: winningPercentage },
  ];
  const userFullName = user && user.first_name ? `${user.first_name} ${user.last_name}` : '';
  return (
    <ProfileWithSpinner
      isLoading={!user || !games}
      userFullName={userFullName}
      user={user}
      stateList={stateList}
      games={games}
      photo={photo}
    />

  );
};

Profile.propTypes = {
  userFullName: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  stateList: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  photo: PropTypes.string.isRequired,
};

export default ProfileContainer;
