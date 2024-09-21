import axios from 'axios';
import { LoginInfo, User } from '../types/user-types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getUserInfo(login: LoginInfo): Promise<User> {
  return await axios.post(`${BASE_URL}/user/login`, login)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    });
}

export const LoginService = {
  getUserInfo
};