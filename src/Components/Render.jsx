import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import Game from '../Game/Game';
// import { loadUser } from '../redux/auth/utiles';

const Render = () => {
  const auth = true;
  // const auth = useSelector((state) => state.auth);
  // loadUser();
  return (
    !auth
      ? <Authentication />
      : (
        <>
          <Navigation />
          <Redirect to="lobby" />
          <Switch>
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* <PrivateRoute exact path="/game/:gameId" component={Game} /> */}
            <Route exact path="/game/:gameId" component={Game} />
          </Switch>
        </>
      )
  );
};

export default Render;
