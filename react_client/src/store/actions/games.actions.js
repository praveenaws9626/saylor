import { userConstants } from './types';
// import { history } from '../helpers';

export const userActions = {
  setGameData,
  deleteGameData,
};

export function setGameData(gamesData) {
  return {
    type: userConstants.SET_GAMES_DATA,
    payload: JSON.parse(JSON.stringify(gamesData)),
  };
}

export function deleteGameData() {
    return {
      type: userConstants.DELETE_GAMES_DATA,
    };
}
