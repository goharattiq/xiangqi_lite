import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './AuthTab.scss';

const AuthTab = ({ clickTabHandler, activeTab }) => (
  <Nav fill variant="tabs">
    <Nav.Item>
      <Nav.Link
        id="signin"
        className={`border tabs border-dark ${activeTab ? 'active' : 'inactive'}`}
        onClick={clickTabHandler}
      >
        SIGNIN
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        id="signup"
        className={`border tabs border-dark ${!activeTab ? 'active' : 'inactive'}`}
        onClick={clickTabHandler}
      >
        SIGNUP
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

AuthTab.propTypes = {
  clickTabHandler: PropTypes.func.isRequired,
  activeTab: PropTypes.bool.isRequired,
};

export default AuthTab;
