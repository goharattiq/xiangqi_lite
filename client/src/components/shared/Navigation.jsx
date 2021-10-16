import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { signOutUser } from '../../redux/auth/thunk';
import './styles/Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return auth && auth.user ? (
    <Navbar expand="lg" bg="style">
      <Container>
        <Navbar.Brand className="nav-link-custom">
          <Link to="/lobby" className="navbar-brand nav-link-custom">
            Xiangqi Lite
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              id="play"
              to="/lobby"
              className="nav-link-custom"
              activeClassName="selected"
            >
              Play
            </NavLink>
            <NavLink
              id="leaderboard"
              to="/leaderboard"
              className="nav-link-custom"
              activeClassName="selected"
            >
              LeaderBoard
            </NavLink>
            <NavLink
              id="profile"
              to={`/profile/${auth.user ? auth.user.username : ''}`}
              className="nav-link-custom"
              activeClassName="selected"
            >
              {`Profile${auth.user && `-${auth.user.username}`}`}
            </NavLink>
            <NavLink
              id="logout"
              activeClassName="selected"
              to="/logout"
              className="nav-link-custom"
              onClick={() => {
                dispatch(signOutUser());
              }}
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : '';
};
export default Navigation;
