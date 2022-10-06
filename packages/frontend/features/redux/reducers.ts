// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineReducers, Reducer } from '@reduxjs/toolkit';

import coinSlice from '../slices/coinSlice';
import userSlice from '../slices/userSlice';

export const rootReducer: Reducer = combineReducers({
  coin: coinSlice,
  user: userSlice

});

export type RootState = ReturnType<typeof rootReducer>;
