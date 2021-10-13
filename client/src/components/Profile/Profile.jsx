import React, { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { clearProfile } from '../../redux/profile/actions';
import { fetchAllTimeGames, fetchUserProfile } from '../../redux/profile/thunk';
import { PRIMARY } from '../../utilis/constants';
import GameList from '../shared/GameList';
import Spinner from '../shared/Spinner';

import './styles/Profile.scss';

const Profile = ({
  userFullName, user, statList, games, photo, bio, isSessionUser,
}) => (
  <Container className="bg-white w-75 mt-3 pb-5 rounded-3">
    <>
      <Avatar name={user.username} src={photo} size={200} className="profile-avatar m-3" color="#815752" />
      <div className="d-inline-flex flex-column user-detail ms-5">
        <p className="user-fullname">{userFullName}</p>
        <p>{user ? user.username : ''}</p>
        <p>{bio}</p>
        {
          isSessionUser
            && (
              <Link to={`/profile/${user.username}/edit`} className="edit-button">
                <i className="fas fa-edit" />
              </Link>
            )
        }
      </div>
    </>
    <ul className="list-group position-relative start-50 mt-5 mb-3 user-stats">
      {
          statList.map((state) => (
            <li key={state.name} className="list-group-item score m-2">
              <p className="text-center">
                {state.score}
              </p>
              <p className="text-center">{state.name}</p>
            </li>
          ))
        }
    </ul>
    <hr className="position-relative start-50 w-75" />
    <GameList type="All Time" games={games} username={user.username} />
  </Container>
);

const ProfileWithSpinner = Spinner(Profile);

const ProfileContainer = () => {
  document.body.style.backgroundColor = PRIMARY;
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const callback = useCallback(() => fetchUserProfile(profileUsername));
  useEffect(() => {
    dispatch(clearProfile());
    dispatch(callback());
    dispatch(fetchAllTimeGames(profileUsername));
  }, [auth, profileUsername]);
  const {
    user,
    gamesCount,
    winsCount,
    lossesCount,
    drawCount,
    winningPercentage,
    games,
    photo,
    bio,
  } = useSelector(({ profile }) => ({
    user: profile.user,
    bio: profile.bio,
    gamesCount: profile.games_played_count,
    winsCount: profile.wins_count,
    lossesCount: profile.losses_count,
    drawCount: profile.draw_count,
    winningPercentage: profile.winning_percentage,
    games: profile.games,
    photo: profile.photo,
  }));

  const statList = [
    { name: 'Games', score: gamesCount },
    { name: 'Wins', score: winsCount },
    { name: 'Losses', score: lossesCount },
    { name: 'Draws', score: drawCount },
    { name: 'Win%', score: winningPercentage },
  ];
  const userFullName = user && user.first_name ? `${user.first_name} ${user.last_name}` : '';
  return (
    <ProfileWithSpinner
      isLoading={!user || !games}
      userFullName={userFullName}
      user={user}
      statList={statList}
      games={games}
      photo={photo}
      bio={bio}
      isSessionUser={auth && auth.user.username === profileUsername}
    />
  );
};

Profile.propTypes = {
  userFullName: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  statList: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  photo: PropTypes.string,
  bio: PropTypes.string.isRequired,
  isSessionUser: PropTypes.bool.isRequired,
};

export default ProfileContainer;
