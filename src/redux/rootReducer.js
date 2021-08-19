import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import leaderReducer from './leaderboard/reducer';
import profileReducer from './profile/redux';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  leaderBoard: leaderReducer,
});
