/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import admin from './features/admin';
import enter from './features/enter';
import vacancy from './features/vacancy';

export const store = configureStore({
  reducer: {
    enter,
    admin,
    vacancy,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
