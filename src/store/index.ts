import { configureStore } from '@reduxjs/toolkit';
import dataReducer from 'store/reducer/data';
import { createLogger } from 'redux-logger';

// react-logger
const logger = createLogger();

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
