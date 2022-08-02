// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineReducers, Reducer } from '@reduxjs/toolkit';

import basketSlice from '../slices/test/basketSlice';
import counterSlice from '../slices/test/counterSlice';
import userSlice from '../slices/userSlice';

export const rootReducer: Reducer = combineReducers({
  basket: basketSlice,
  counter: counterSlice,
  user: userSlice
});

export type RootState = ReturnType<typeof rootReducer>;
