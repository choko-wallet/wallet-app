import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from '../slices/counterSlice';
import basketSlice from '../slices/basketSlice';

export const rootReducer = combineReducers({
  counter: counterSlice,
  basket: basketSlice,
});

export type RootState = ReturnType<typeof rootReducer>;