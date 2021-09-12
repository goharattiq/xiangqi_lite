import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import chatReducer from './chat/reducer';
import gameReducer from './game/reducer';
import leaderReducer from './leaderboard/reducer';
import lobbyReducer from './lobby/reducer';
import profileReducer from './profile/reducer';
import toastReducer from './toast/reducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  lobby: lobbyReducer,
  game: gameReducer,
  leaderBoard: leaderReducer,
  chat: chatReducer,
  toast: toastReducer,
});
