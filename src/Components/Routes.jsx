/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Switch, useHistory, useLocation, useParams,
} from 'react-router-dom';

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
  const {
    authUser, gameParams, accessToken,
  } = useSelector(({ auth, game }) => ({
    authUser: auth && auth.user,
    accessToken: auth && auth.access_token,
    gameParams: game.params,
  }));
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [urlState, setUrlState] = useState('');
  useEffect(() => {
    const connectSokcets = async () => {
      if (authUser && Object.keys(authUser).length) {
        await useSockets(accessToken, dispatch);
        await subscribeGameSockets(history, authUser.username, dispatch);
        await subscribeChatSocketsEvent(dispatch);
        if (urlState.match('game')) {
          history.push(urlState);
          setUrlState('');
        }
      }

      if (location.pathname.match('game')) {
        setUrlState(location.pathname);
      }

      if (authUser && Object.keys(authUser).length && !gameParams && localStorage.getItem('gameID')) {
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
