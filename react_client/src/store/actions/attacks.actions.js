import { attackConstants } from './types';
import {initialState} from '../initialState';
// import { history } from '../helpers';

export const userActions = {
  setHealth,
  resetHealth,
  setGameStatus,
};

export function setHealth(payload) {
    console.log(payload)
  return {
    type: attackConstants.SET_HEALTH,
    payload: Object.assign({}, payload),
  };
}

export function resetHealth() {
    return {
      type: attackConstants.RESET_HEALTH,
      payload: {
          ...initialState.healths
      },
    };
  }

  export function setGameStatus(status) {
    return {
      type: attackConstants.SET_GAME_STATUS,
      payload: {
          ...initialState.healths,
          gameStatus: status,
      },
    };
  }
