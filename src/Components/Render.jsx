import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from './Navigation';
// import PrivateRoute from './PrivateRoute';
import Game from '../Game/Game';
import LeaderBoard from '../Leaderboard/LeaderBoard';
// import { loadUser } from '../redux/auth/utiles';

const Render = () => {
  // const auth = useSelector((state) => state.auth);
  const auth = true;
  // loadUser();
  return (
    !auth
      ? <Authentication />
      : (
        <>
          <Navigation />
          <Redirect to="lobby" />
          <Switch>
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/game/:gameId" component={Game} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Render;
