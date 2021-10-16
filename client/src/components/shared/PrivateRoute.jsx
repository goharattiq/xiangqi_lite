import React from 'react';

import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../../utilis/history';

const PrivateRoute = ({
  // eslint-disable-next-line react/prop-types
  component: Component,
  ...rest
}) => {
  const auth = useSelector((state) => state.auth);
  if (!auth) {
    history.push('/auth');
  }
  return (
    <Route {...rest} component={Component} />
  );
};

export default PrivateRoute;
