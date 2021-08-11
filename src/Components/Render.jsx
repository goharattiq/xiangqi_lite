import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from '../Lobby/Navigation';
import PrivateRoute from './PrivateRoute';

const Render = () => {
  const auth = useSelector((state) => state.auth);
  return (
    !auth
      ? <Authentication />
      : (
        <>
          <Navigation />
          <Switch>
            {/* <Route exact path="/" render={() => (!auth ? <Authenti
          cation /> : <Redirect to="/lobby" />)} /> */}
            <PrivateRoute exact path="/lobby" component={Lobby} />
            {/* <Route exact path="/lobby" render={() => (auth ? <Lobby />
        // : <Redirect to="/" />)} /> */}
            {/* <Route exact path="/spectate" component={} />
      <Route exact path="/leaderboard" component={} /> */}
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </>
      )
  );
};

export default Render;
