// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineReducers, Reducer } from '@reduxjs/toolkit';

import statusSlice from '../slices/status';
import networkSlice from '../slices/network';
import userSlice from '../slices/user';

export const rootReducer: Reducer = combineReducers({
  user: userSlice,
  network: networkSlice,
  status: statusSlice
});

export type RootState = ReturnType<typeof rootReducer>;
