import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';

const Navigation = () => {
  const activeNav = 'play';
  const className = 'active';
  const [previousActive, setPreviousActive] = useState(activeNav);
  const handleActiveTab = (event) => {
    document.getElementById(event.target.id).classList.add(className);
    if (previousActive !== event.target.id
       && document.getElementById(previousActive).classList) {
      document.getElementById(previousActive).classList.remove(className);
    }
    setPreviousActive(event.target.id);
  };
  return (
    <Navbar expand="lg" bg="style">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            Xiangqi Lite
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link id="play" to="/lobby" className="nav-link active" onClick={handleActiveTab}>
              Play
            </Link>
            <Link id="spectate" to="/spectate" className="nav-link" onClick={handleActiveTab}>
              Spectate
            </Link>
            <Link id="leaderboard" to="/leaderboard" className="nav-link" onClick={handleActiveTab}>
              LeaderBoard
            </Link>
            <Link id="profile" to="/profile" className="nav-link" onClick={handleActiveTab}>
              Profile
            </Link>
            <Link id="logout" to="/" className="nav-link" onClick={handleActiveTab}>
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
