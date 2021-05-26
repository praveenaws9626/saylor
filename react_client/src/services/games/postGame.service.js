import { logError } from '../catch.service';
import axios from 'axios';
import { authHeader } from '../../helpers/authHeader';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8081';

export const postGame = async data => {
  try {
    const res = await axios({
      method: 'post',
      url: `${API_URL}/api/game-results`,
      headers: authHeader(),
      data,
    });
    return res;
  } catch (err) {
    return logError(err);
  }
};
