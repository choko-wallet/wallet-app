// Copyright 2021-2022 @choko-wallet/app-redux authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Action, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { rootReducer } from './reducers';

export const store: Store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: rootReducer
});

/* eslint-disable */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;// for unwrap then catch
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
/* eslint-enable */
