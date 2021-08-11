import React, { useCallback, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/profile/thunk';
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const callback = useCallback((username) => fetchUserProfile(username));
  useEffect(() => {
    dispatch(callback(auth.user.username));
  }, [callback]);
  const {
    username,
    firstName,
    lastName,
    gamesCount,
    winsCount,
    lossesCount,
    drawCount,
  } = useSelector(({ profile }) => ({
    username: profile.username,
    firstName: profile.first_name,
    lastName: profile.last_name,
    gamesCount: profile.games_played_count,
    winsCount: profile.wins_count,
    lossesCount: profile.losses_count,
    drawCount: profile.draw_count,
  }));
  const stateList = [
    { name: 'Games', score: gamesCount },
    { name: 'Wins', score: winsCount },
    { name: 'Losses', score: lossesCount },
    { name: 'Draws', score: drawCount },
    { name: 'Winning%', score: winsCount },
  ];
  return (
    <Container className="bg-white w-75 mt-5">
      <div className="d-inline-flex user-profile mt-5 ms-5">
        <div className="avatar" />
        <p className="user-fullname">{`${firstName} ${lastName}`}</p>
        <p className="user-username">{username}</p>
      </div>
      <ul className="m-5 list-group list-group-horizontal user-stats">
        {
          stateList.map((state) => (
            <li key={state.name} className="score list-group-item m-2">
              <p className="m-0">{state.score}</p>
              <p className="m-0">{state.name}</p>
            </li>
          ))
        }
      </ul>
    </Container>
  );
};

export default Profile;
