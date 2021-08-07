/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Authentication from './Authentication/Authentication';
import Lobby from './Lobby/Lobby';

const App = () => (
  <Provider store={store}>
    <Router>
      <Lobby />
    </Router>
  </Provider>

);

export default App;
