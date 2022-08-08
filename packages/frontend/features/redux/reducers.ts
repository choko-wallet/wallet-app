// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineReducers, Reducer } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import basketSlice from '../slices/test/basketSlice';
import counterSlice from '../slices/test/counterSlice';
import userSlice from '../slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

export const rootReducer: Reducer = combineReducers({
  basket: basketSlice,
  counter: counterSlice,
  user: userSlice
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
