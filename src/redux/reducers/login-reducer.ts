import { User } from '../../types/user-types';
import { AnyAction } from '@reduxjs/toolkit';
import { LifeCycle } from '../../types/redux-types';

interface LoginReducer {
  user: User | null,
  loginState: { lifeCycle: LifeCycle }
}

const initState: LoginReducer = {
  user: null,
  loginState: {lifeCycle: LifeCycle.NONE}
};

const reducer = (state: LoginReducer = initState, action: AnyAction) => {
  switch (action.type) {
    case 'LOAD_CACHED_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGIN_REQUESTED': {
      return {
        ...state,
        loginState: {lifeCycle: LifeCycle.REQUESTED}
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        loginState: {lifeCycle: LifeCycle.SUCCESS},
        user: action.payload,
      };
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        loginState: {lifeCycle: LifeCycle.ERROR}
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
};

export default reducer;