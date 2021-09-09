/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch, useHistory } from 'react-router-dom';

import Authentication from '../Authentication/Authentication';
import Game from '../Game/Game';
import LeaderBoard from '../Leaderboard/LeaderBoard';
import Lobby from '../Lobby/Lobby';
import EditProfile from '../Profile/EditProfile';
import Profile from '../Profile/Profile';
import { subscribeChatSocketsEvent } from '../socketio/chatSocketio';
import { subscribeGameSockets } from '../socketio/gameSocketio';
import { useSockets } from '../socketio/socketio';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import ToastMessage from './ToastMessage';

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
          <ToastMessage />
          <Redirect to="/lobby" />
          <Switch>
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/edit/:profileID" component={EditProfile} />
            <PrivateRoute exact path="/game/:gameId" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Render;
