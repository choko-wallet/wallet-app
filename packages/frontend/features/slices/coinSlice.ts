// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface FetchCoinPricePayload {
  currency: string;
  coinArray: string[];
}

type CoinData = Array<CoinPrice>

interface CoinPrice {
  [key: string]: PriceUsd
}

interface PriceUsd {
  [key: string]: number;
}

export const fetchCoinPrice = createAsyncThunk<CoinData, FetchCoinPricePayload, { state: RootState }>(
  'users/fetchCoinPrice',
  async (payload: FetchCoinPricePayload, { rejectWithValue }) => {
    const { coinArray, currency } = payload;

    try {
      const coins = coinArray.join('%2C');
      const coinData = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currency}`)
        .then((res) => res.json() as Promise<CoinData>);

      return coinData;
    } catch (err) {
      return rejectWithValue('Api not work');
    }
  },
  /* eslint-disable */
  {

    condition: (payload, { getState }) => {
      const loading = getState().coin.loading as string;

      if (loading === 'pending') {
        return false;
      }
      return true;
    }
  }
  /* eslint-enable */

);

interface CoinSliceItem {
  error: string;
  coinPrice: CoinData;
  loading: string;
}

const initialState: CoinSliceItem = {
  coinPrice: [],
  error: '',
  loading: 'idle'

};

/* eslint-disable sort-keys */
export const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    clearAll: (state) => {
      state.coinPrice = [];
      state.error = '';
      state.loading = 'idle';
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinPrice.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchCoinPrice.fulfilled, (state, action) => {
        console.log('fulfiled');
        console.log('fulfiled', action.payload);
        state.coinPrice = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchCoinPrice.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      });
  }
});

export const { clearAll } = coinSlice.actions;
export default coinSlice.reducer;
