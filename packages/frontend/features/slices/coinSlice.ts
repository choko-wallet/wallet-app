// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { RootState } from '../redux/store';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FetchMarketPricePayload {
  currency: string;
}

interface FetchCoinPricePayload {
  currency: string;
  coinArray: string[];
}

interface MarketData {
}

interface CoinData {
}

// interface CoinPrice {
//   [key: string]: PriceUsd
// };

export const fetchMarketPrice = createAsyncThunk<MarketData, FetchMarketPricePayload, { state: RootState }>(
  'users/fetchMarketPrice',
  async (payload: FetchMarketPricePayload, { getState, rejectWithValue }) => {
    const { currency } = payload;

    try {
      const marketData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=1&sparkline=false`)
        .then((res) => res.json());

      console.log('marketData', marketData);

      return marketData;
    } catch (err) {
      // console.log('redux-err', err);//控制台显示具体报错
      return rejectWithValue('Api not work');// 给用户的报错提示
    }
  },
  {
    condition: (payload, { getState }) => {
      const loading = getState().coin.loading;

      if (loading === 'pending') {
        return false;
      }
    }
  }

);

export const fetchCoinPrice = createAsyncThunk<CoinData, FetchCoinPricePayload, { state: RootState }>(
  'users/fetchCoinPrice',
  async (payload: FetchCoinPricePayload, { getState, rejectWithValue }) => {
    const { coinArray, currency } = payload;
    const coins = coinArray.join('%2C');
    // const coins = ['bitcoin', 'ethereum', 'dogecoin'].join('%2C');

    try {
      const coinData = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currency}`)
        .then((res) => res.json());

      // console.log('coinData', coinData)
      return coinData;
    } catch (err) {
      // console.log('redux-err', err);//控制台显示具体报错
      return rejectWithValue('Api not work');// 给用户的报错提示
    }
  },
  {
    condition: (payload, { getState }) => {
      const loading = getState().coin.loading;

      if (loading === 'pending') {
        return false;
      }
    }
  }

);

interface CoinSliceItem {
  error: string;
  marketPriceTop30: {};
  loading: string;
}

const initialState: CoinSliceItem = {
  error: '',
  marketPriceTop30: {},
  loading: 'idle'
};

/* eslint-disable sort-keys */
export const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    clearAll: (state, _: PayloadAction<string>) => {
      state.marketPriceTop30 = {};
      state.error = '';
      state.loading = 'idle';
    }

  },
  // thunk 函数的return 是extraReducers addCase函数的action.payload
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketPrice.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchMarketPrice.fulfilled, (state, action) => {
        // console.log('fulfiled');
        state.marketPriceTop30 = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchMarketPrice.rejected, (state, action) => {
        // console.log('type', typeof (action.payload))
        state.loading = 'idle';
        state.error = action.payload as string;
      })

      .addCase(fetchCoinPrice.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchCoinPrice.fulfilled, (state, action) => {
        // console.log('fulfiled');
        // state.marketPriceTop30 = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchCoinPrice.rejected, (state, action) => {
        // console.log('type', typeof (action.payload))
        state.loading = 'idle';
        state.error = action.payload as string;
      });
  }
});

export const { clearAll } = coinSlice.actions;
export default coinSlice.reducer;
