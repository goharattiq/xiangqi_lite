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
import { socketLeaveGame, subscribeGameSockets } from '../socketio/gameSocketio';
import { useSockets } from '../socketio/socketio';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import ToastMessage from './ToastMessage';

const Routes = () => {
  const { authUser, gameParams, accessToken } = useSelector(({ auth, game }) => ({
    authUser: auth ? auth.user : null,
    accessToken: auth ? auth.access_token : null,
    gameParams: game.params,
  }));
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const connectSokcets = async () => {
      if (authUser && Object.keys(authUser).length !== 0) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useSockets(accessToken);
        await subscribeGameSockets(history, authUser.username, dispatch);
        await subscribeChatSocketsEvent(dispatch);
      }
      if (authUser && Object.keys(authUser).length !== 0 && !gameParams && localStorage.getItem('gameID')) {
        socketLeaveGame(localStorage.getItem('gameID'), dispatch);
      }
    };
    connectSokcets();
  }, [authUser]);
  return (
    !authUser
      ? <Authentication />
      : (
        <>
          <Navigation />
          <ToastMessage />
          <Redirect to="/lobby" />
          <Switch>
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <PrivateRoute exact path="/profile/:profileUsername" component={Profile} />
            <PrivateRoute exact path="/profile/:profileUsername/edit" component={EditProfile} />
            <PrivateRoute exact path="/game/:gameId" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Routes;
