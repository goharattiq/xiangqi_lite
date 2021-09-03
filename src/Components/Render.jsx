/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import {
  Redirect, Switch, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '../Authentication/Authentication';
import Lobby from '../Lobby/Lobby';
import Profile from '../Profile/Profile';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import Game from '../Game/Game';
import LeaderBoard from '../Leaderboard/LeaderBoard';
import { useSockets } from '../scoketio/socketio';
import { subscribeGameSockets } from '../scoketio/gameSocketio';
import { subscribeChatSocketsEvent } from '../scoketio/chatSokcetio';

const Render = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const connectSokcets = async () => {
      await auth && useSockets(auth.access_token);
      await auth && subscribeGameSockets(history, auth.user.username, dispatch);
      await auth && subscribeChatSocketsEvent(dispatch);
    };
    connectSokcets();
  }, [auth]);
  return (
    !auth
      ? <Authentication />
      : (
        <>
          <Navigation />
          <Redirect to="/lobby" />
          <Switch>
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/game/:gameId" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Render;
