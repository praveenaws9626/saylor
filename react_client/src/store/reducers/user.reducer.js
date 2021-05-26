import { userConstants } from '../actions/types';

const {
  SET_USERNAME_NAVBAR,
  SET_USER_DATA,
} = userConstants;

export function users(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload;
    case SET_USERNAME_NAVBAR:
      return {
        ...state,
        userName: action.username,
      };
    default:
      return state;
  }
}
