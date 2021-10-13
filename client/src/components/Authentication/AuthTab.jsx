import React from 'react';

import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

import { SIGNIN, SIGNUP } from '../../utilis/constants';
import './AuthTab.scss';

const AuthTab = ({ clickTabHandler, activeTab }) => (
  <Nav fill variant="tabs">
    <Nav.Item>
      <Nav.Link
        id={SIGNIN}
        className={`border tabs border-dark ${activeTab === SIGNIN && 'active'}`}
        onClick={clickTabHandler}
      >
        SIGNIN
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        id={SIGNUP}
        className={`border tabs border-dark ${activeTab === SIGNUP && 'active'}`}
        onClick={clickTabHandler}
      >
        SIGNUP
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

AuthTab.propTypes = {
  clickTabHandler: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default AuthTab;
