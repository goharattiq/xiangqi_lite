import React from 'react';
import { Container } from 'react-bootstrap';
import './Profile.scss';

const Profile = () => (
  <Container className="bg-white w-75 mt-5">
    <div className="d-inline-flex user-profile mt-5 ms-5">
      <div className="avatar" />
      <p className="user-fullname">Gohar Attiq</p>
      <p className="user-username">goharattiq</p>
    </div>
    <ul className="m-5 list-group list-group-horizontal user-stats">
      <li className="score list-group-item m-2">
        <h6 className="ps-2">23</h6>
        <p>Games</p>
      </li>
      <li className="score list-group-item m-2">
        <h6 className="ps-2">23</h6>
        <p>Wins</p>
      </li>
      <li className="score list-group-item m-2">
        <h6 className="ps-2">23</h6>
        <p>Losses</p>
      </li>
      <li className="score list-group-item m-2">
        <h6 className="ps-2">23</h6>
        <p>Draws</p>
      </li>
      <li className="score list-group-item m-2">
        <h6 className="ps-2">23%</h6>
        <p>Winning</p>
      </li>
    </ul>
  </Container>
);

export default Profile;
