import { attackConstants } from '../actions/types';

const {
  SET_HEALTH,
  RESET_HEALTH,
  SET_GAME_STATUS,
} = attackConstants;

export function attacks(state = {}, action) {
    console.log(action.payload);
  switch (action.type) {
    case SET_HEALTH:
      return action.payload;
    case RESET_HEALTH:
        return action.payload;
    case SET_GAME_STATUS:
        return action.payload;
    default:
      return state;
  }
}
