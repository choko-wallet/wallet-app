// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { PayloadAction } from '@reduxjs/toolkit';

interface FetchMarketPricePayload {
  currency: string;
}

interface FetchCoinPricePayload {
  currency: string;
  coinArray: string[];
}

interface SingelCoinData {
  // ath: number;
  // ath_change_percentage: number;
  // ath_date: string; atl: number;
  // atl_change_percentage: number;
  // atl_date: string;
  // circulating_supply: number;
  // current_price: number;
  // fully_diluted_valuation: number;
  // high_24h: number;
  id: string;
  // image: string;
  // last_updated: string;
  // low_24h: number;
  // market_cap: number;
  // market_cap_change_24h: number;
  // market_cap_change_percentage_24h: number;
  // market_cap_rank: number;
  // max_supply: number;
  // name: string;
  // price_change_24h: number;
  // price_change_percentage_24h: number;
  // roi: null
  // symbol: string;
  // total_supply: number;
  // total_volume: number;
}

type MarketData = Array<SingelCoinData>

type CoinData = Array<CoinPrice>

interface CoinPrice {
  [key: string]: PriceUsd
}

interface PriceUsd {
  usd: number;
}

export const fetchMarketPrice = createAsyncThunk<MarketData, FetchMarketPricePayload, { state: RootState }>(
  'users/fetchMarketPrice',
  async (payload: FetchMarketPricePayload, { rejectWithValue }) => {
    const { currency } = payload;

    try {
      const marketData =
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=1&sparkline=false`)
          .then((res) => res.json());

      console.log('marketData', marketData);

      // 需要整理数据  data
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
  async (payload: FetchCoinPricePayload, { rejectWithValue }) => {
    const { coinArray, currency } = payload;
    const coins = coinArray.join('%2C');
    // const coins = ['bitcoin', 'ethereum', 'dogecoin'].join('%2C');

    try {
      const coinData = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currency}`)
        .then((res) => res.json());

      // console.log('coinData', coinData)
      return coinData as CoinData;
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
  marketPriceTop30: MarketData;
  loading: string;
}

const initialState: CoinSliceItem = {
  error: '',
  loading: 'idle',
  marketPriceTop30: []

};

/* eslint-disable sort-keys */
export const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    clearAll: (state) => {
      state.marketPriceTop30 = [];
      state.error = '';
      state.loading = 'idle';
    }

  },
  // thunk 函数的return 是extraReducers addCase函数的action.payload
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketPrice.pending, (state) => {
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

      .addCase(fetchCoinPrice.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchCoinPrice.fulfilled, (state) => {
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
