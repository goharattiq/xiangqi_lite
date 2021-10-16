/* eslint-disable no-unused-vars */
import React from 'react';

import { Router } from 'react-router-dom';

import Routes from './components/shared/Routes';
import history from './utilis/history';

const App = () => (
  <Router history={history}>
    <Routes />
  </Router>

);

export default App;
