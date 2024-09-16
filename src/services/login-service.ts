import axios from 'axios';
import { LoginInfo } from '../types/user-types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getUserInfo(login: LoginInfo) {
  return await axios.post(`${BASE_URL}/user/login`, login);
}

export const LoginService = {
  getUserInfo
};