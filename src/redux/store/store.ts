import type { AxiosInstance } from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export const createAppStore = (axios: AxiosInstance) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { axios },
        },
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
