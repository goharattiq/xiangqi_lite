import React from 'react';

import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({
  // eslint-disable-next-line react/prop-types
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  if (!auth) {
    history.push('/auth');
  }
  return (
    <Route {...rest} component={Component} />
  );
};

export default PrivateRoute;
