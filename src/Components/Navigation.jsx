import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutUser } from '../redux/auth/thunk';
import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <Navbar expand="lg" bg="style">
      <Container>
        <Navbar.Brand>
          <Link to="/lobby" className="navbar-brand">
            Xiangqi Lite
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link id="play" to="/lobby" className="nav-link-custom">
              Play
            </Link>
            <Link id="leaderboard" to="/leaderboard" className="nav-link-custom">
              LeaderBoard
            </Link>
            <Link id="profile" to={`/profile/${auth.user ? auth.user.username : ''}`} className="nav-link-custom">
              {`Profile${auth.user ? `-${auth.user.username}` : ''}`}
            </Link>
            <Link
              id="logout"
              to="/"
              className="nav-link-custom"
              onClick={() => {
                dispatch(signOutUser());
              }}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
