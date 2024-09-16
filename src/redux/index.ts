import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import loginReducer from './reducers/login-reducer';
import projectReducer from './reducers/project-reducer';

const logger: any = createLogger({
  collapsed: true,
});
const store = configureStore({
  reducer: {
    login: loginReducer,
    project: projectReducer,
  },
  middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>

export default store;

