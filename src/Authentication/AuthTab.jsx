import React from 'react';
import { Nav } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import './AuthTab.scss';

const AuthTab = ({ clickTabHandler, activeTab }) => (
  <Nav fill variant="tabs">
    <Nav.Item>
      <Nav.Link
        id="signin"
        className={`border border-dark ${activeTab ? 'active' : 'inactive'}`}
        onClick={clickTabHandler}
      >
        SIGNIN
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        id="signup"
        className={`border border-dark ${!activeTab ? 'active' : 'inactive'}`}
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
