// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineReducers, Reducer } from '@reduxjs/toolkit';

import basketSlice from '../slices/basketSlice';
import counterSlice from '../slices/counterSlice';

export const rootReducer: Reducer = combineReducers({
  basket: basketSlice,
  counter: counterSlice

});

export type RootState = ReturnType<typeof rootReducer>;
