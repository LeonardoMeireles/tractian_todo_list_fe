import { LoginInfo, User } from '../../types/user-types';
import { LoginService } from '../../services/login-service';
import { NavigateFunction } from 'react-router-dom';

export const loginToApp: any = (loginInfo: LoginInfo, navigate: NavigateFunction) => (dispatch: any) => {
  dispatch({
    type: 'LOGIN_REQUESTED'
  });
  return LoginService.getUserInfo(loginInfo)
    .then((res) => {
      const user: User = res.data;
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

export const logout: any = (navigate: NavigateFunction) => (dispatch: any) => {
  dispatch({
    type: 'LOGOUT'
  });
};