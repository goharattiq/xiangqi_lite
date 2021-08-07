/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Authentication from './Authentication/Authentication';
import Lobby from './Lobby/Lobby';
import Profile from './Profile/Profile';
import Navigation from './Lobby/Navigation';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Redirect to="/lobby" />
      <Switch>
        <Route exact path="/lobby" component={Lobby} />
        {/* <Route exact path="/spectate" component={} />
        <Route exact path="/leaderboard" component={} /> */}
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  </Provider>

);

export default App;
