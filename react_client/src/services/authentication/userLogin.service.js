import { logError } from '../catch.service';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8081'

export const userLogin = async data => {
  try {
    const res = await axios({
      method: 'post',
      url: `${API_URL}/api/login`,
      data: data,
    });
    return res;
  } catch (err) {
    return logError(err);
  }
};
