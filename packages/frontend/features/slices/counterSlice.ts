// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  initialState,
  name: 'counter',

  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    increment: (state) => {
      state.value += 1;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { decrement, increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
