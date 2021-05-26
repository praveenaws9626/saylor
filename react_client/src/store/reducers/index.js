import { combineReducers } from 'redux';

import { users } from './user.reducer';
import { games } from './games.reducer';
import { attacks } from './attacks.reducer';

export const rootReducer = combineReducers({
  userInfo: users,
  gamesInfo: games,
  healths: attacks,
});
