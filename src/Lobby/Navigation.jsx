import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';

const Navigation = () => (
  <Navbar expand="lg" bg="style">
    <Container>
      <Navbar.Brand href="/">Xiangqi Lite</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#play">Play</Nav.Link>
          <Nav.Link href="#spectate">Spectate</Nav.Link>
          <Nav.Link href="#leaderboard">Leaderboard</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
