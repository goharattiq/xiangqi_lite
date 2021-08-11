import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from '../Lobby/Navigation';
import PrivateRoute from './PrivateRoute';
// import { loadUser } from '../redux/auth/utiles';

const Render = () => {
  const auth = useSelector((state) => state.auth);
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
          </Switch>
        </>
      )
  );
};

export default Render;
