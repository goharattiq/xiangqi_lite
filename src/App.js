/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Authentication from './Authentication/Authentication';

const App = () => (
  <Provider store={store}>
    <Authentication />
  </Provider>

);

export default App;
