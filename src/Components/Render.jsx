import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import Game from '../Game/Game';
import LeaderBoard from '../Leaderboard/LeaderBoard';
// import { loadUser } from '../redux/auth/utiles';

const Render = () => {
  const auth = useSelector((state) => state.auth);
  // const auth = true;s
  // loadUser();
  return (
    !auth
      ? <Authentication />
      : (
        <>
          <Navigation />
          <Redirect to="/lobby" />
          <Switch>
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <PrivateRoute exact path="/spectate" component={Lobby} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/game/:gameId" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Render;
