import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../redux/auth/thunk';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <Navbar expand="lg" bg="style">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            Xiangqi Lite
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link id="play" to="/lobby" className="nav-link-custom">
              Play
            </Link>
            <Link id="spectate" to="/spectate" className="nav-link-custom">
              Spectate
            </Link>
            <Link id="leaderboard" to="/leaderboard" className="nav-link-custom">
              LeaderBoard
            </Link>
            <Link id="profile" to="/profile" className="nav-link-custom">
              Profile
            </Link>
            {auth ? (
              <Link
                id="logout"
                to="/"
                className="nav-link-custom"
                onClick={() => {
                  dispatch(signOutUser(auth.access_token));
                }}
              >
                Logout
              </Link>
            ) : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
