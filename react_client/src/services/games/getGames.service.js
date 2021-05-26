import { logError } from '../catch.service';
import axios from 'axios';
import { authHeader } from '../../helpers/authHeader'
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8081'

export const getGames = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/api/game-result`,
      headers: authHeader(),
    });
    return res;
  } catch (err) {
    return logError(err);
  }
};
