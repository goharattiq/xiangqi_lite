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
  const {auth,gameParams} = useSelector(({auth, game}) => ({auth, gameParams: game.params}));
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const connectSokcets = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await auth && useSockets(auth.access_token);
      await auth && subscribeGameSockets(history, auth.user.username, dispatch);
      await auth && subscribeChatSocketsEvent(dispatch);
      if (auth && !gameParams) {
        socketLeaveGame(localStorage.getItem('gameID'), dispatch);
        localStorage.removeItem('gameID')
      }
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
            <PrivateRoute exact path="/profile/:profileID" component={Profile} />
            <PrivateRoute exact path="/profile/edit/:profileID" component={EditProfile} />
            <PrivateRoute exact path="/game/:gameId" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        </>
      )
  );
};

export default Routes;
