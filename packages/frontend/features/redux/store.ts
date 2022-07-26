// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
