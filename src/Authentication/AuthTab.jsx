import React from 'react';
import { Nav } from 'react-bootstrap';
import './AuthTab.scss';

const AuthTab = () => (
  <Nav fill variant="tabs">
    <Nav.Item>
      <Nav.Link
        id="signin"
        className="active"
      >
        SIGNIN
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        id="signup"
        className="inactive"
      >
        SIGNUP
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default AuthTab;
