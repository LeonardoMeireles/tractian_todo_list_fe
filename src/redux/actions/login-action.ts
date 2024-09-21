import { LoginInfo, User } from '../../types/user-types';
import { LoginService } from '../../services/login-service';
import { NavigateFunction } from 'react-router-dom';

export const loginToApp: any = (loginInfo: LoginInfo, navigate: NavigateFunction) => (dispatch: any) => {
  dispatch({
    type: 'LOGIN_REQUESTED'
  });
  return LoginService.getUserInfo(loginInfo)
    .then((userRes) => {
      const user: User = userRes;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
      navigate(`/project/${user.projects[0]._id}`);
    })
    .catch(() => {
      dispatch({
        type: 'LOGIN_ERROR',
      });
    });
};

export const loadCachedUser: any = (user: User) => (dispatch: any) => {
  dispatch({
    type: 'LOAD_CACHED_USER',
    payload: user
  });
};

export const logout: any = () => (dispatch: any) => {
  localStorage.setItem('user', '');
  dispatch({
    type: 'LOGOUT'
  });
};