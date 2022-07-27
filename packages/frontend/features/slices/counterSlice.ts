// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

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
