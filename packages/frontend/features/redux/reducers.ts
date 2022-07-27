// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { combineReducers } from '@reduxjs/toolkit';

import basketSlice from '../slices/basketSlice';
import counterSlice from '../slices/counterSlice';

export const rootReducer = combineReducers({
  basket: basketSlice,
  counter: counterSlice

});

export type RootState = ReturnType<typeof rootReducer>;
