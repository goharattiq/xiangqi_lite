import React, { useCallback, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/profile/thunk';
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const callback = useCallback((username) => fetchUserProfile(username));
  useEffect(() => {
    dispatch(callback('goharattiq'));
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

  return (
    <Container className="bg-white w-75 mt-5">
      <div className="d-inline-flex user-profile mt-5 ms-5">
        <div className="avatar" />
        <p className="user-fullname">{`${firstName} ${lastName}`}</p>
        <p className="user-username">{username}</p>
      </div>
      <ul className="m-5 list-group list-group-horizontal user-stats">
        <li className="score list-group-item m-2">
          <h6 className="ps-2">{gamesCount}</h6>
          <p>Games</p>
        </li>
        <li className="score list-group-item m-2">
          <h6 className="ps-2">{winsCount}</h6>
          <p>Wins</p>
        </li>
        <li className="score list-group-item m-2">
          <h6 className="ps-2">{lossesCount}</h6>
          <p>Losses</p>
        </li>
        <li className="score list-group-item m-2">
          <h6 className="ps-2">{drawCount}</h6>
          <p>Draws</p>
        </li>
        <li className="score list-group-item m-2">
          <h6 className="ps-2">
            {winsCount}
            %
          </h6>
          <p>Winning</p>
        </li>
      </ul>
    </Container>
  );
};

export default Profile;
