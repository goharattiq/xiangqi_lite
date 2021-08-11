/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Authentication from '../Authentication/Authentication';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route {...rest} render={() => (auth ? <Component /> : <Authentication />)} />
  );
};

export default PrivateRoute;
