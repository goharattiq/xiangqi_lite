import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import boardReducer from './board/reducer';
import profileReducer from './profile/redux';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  board: boardReducer,
});
