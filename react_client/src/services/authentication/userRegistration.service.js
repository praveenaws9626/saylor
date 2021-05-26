import axios from 'axios';
import { logError } from '../catch.service';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8081'

export const userRegistration = async data => {
  try {
    const res = await axios({
      method: 'post',
      url: `${API_URL}/api/register`,
      data,
    });
    return res;
  } catch (err) {
    return logError(err);
  }
};
