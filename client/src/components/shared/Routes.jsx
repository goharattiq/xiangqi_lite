/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Switch, Route, useLocation,
} from 'react-router-dom';

import {
  Authentication, Game, LeaderBoard, Lobby, EditProfile, Profile,
} from '../../pages';
import { fetechUser } from '../../redux/auth/thunk';
import { subscribeChatSocketEvents } from '../../socketio/chatSocketio';
import { socketLeaveGame, subscribeGameSocketEvents } from '../../socketio/gameSocketio';
import { connectSockets } from '../../socketio/socketio';
import history from '../../utilis/history';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import ToastMessage from './ToastMessage';

const Routes = () => {
  const location = useLocation();
  const {
    authUser, gameParams, accessToken,
  } = useSelector(({ auth, game }) => ({
    authUser: auth && auth.user,
    accessToken: auth && auth.access_token,
    gameParams: game.params,
  }));
  const dispatch = useDispatch();
  const [urlState, setUrlState] = useState('');
  useEffect(() => {
    const subscirbeSockets = async () => {
      if (authUser && Object.keys(authUser).length) {
        await connectSockets(accessToken, dispatch);
        await subscribeGameSocketEvents(authUser.username, dispatch);
        await subscribeChatSocketEvents(dispatch);
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
    if (!authUser && localStorage.getItem('access_token')) {
      dispatch(fetechUser());
    }
    subscirbeSockets();
  }, [authUser]);
  return (
    <>
      <Navigation />
      <ToastMessage />
      <Redirect to={location.pathname} />
      <Switch>
        <PrivateRoute exact path="/">
          <Redirect to="/lobby" />
        </PrivateRoute>
        <Route exact path="/logout">
          <Redirect to="/auth" />
        </Route>
        <Route exact path="/auth" component={Authentication} />
        <PrivateRoute exact path="/lobby" component={Lobby} />
        <PrivateRoute exact path="/profile/:profileUsername" component={Profile} />
        <PrivateRoute exact path="/profile/:profileUsername/edit" component={EditProfile} />
        <PrivateRoute exact path="/game/:gameId" component={Game} />
        <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
      </Switch>
    </>
  );
};

export default Routes;
