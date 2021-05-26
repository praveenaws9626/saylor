import { userConstants } from '../actions/types';

const {
  SET_GAMES_DATA,
} = userConstants;

export function games(state = {}, action) {
  switch (action.type) {
    case SET_GAMES_DATA:
      return action.payload;
    default:
      return state;
  }
}
