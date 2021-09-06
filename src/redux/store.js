/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const initialState = {};
const middleware = [thunk];

const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(...middleware);

const store = createStore(
  rootReducer,
  initialState,
  reduxCompose,
);

export default store;
