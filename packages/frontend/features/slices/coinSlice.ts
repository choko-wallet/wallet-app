// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface fetchMarketPricePayload {
  currency: string;
}


export const fetchMarketPrice = createAsyncThunk(
  'users/fetchMarketPrice',
  async (payload: fetchMarketPricePayload, { rejectWithValue }) => {
    const { currency } = payload;

    try {
      const marketData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=1&sparkline=false`)
        .then((res) => res.json());

      console.log('marketData', marketData)
      return marketData;

    } catch (err) {
      // console.log('redux-err', err);//控制台显示具体报错
      return rejectWithValue('Api not work');//给用户的报错提示

    }



  }
);



interface CoinSliceItem {
  error: string;
  marketPriceTop30: {};
}

const initialState: CoinSliceItem = {
  error: '',
  marketPriceTop30: {},
};

/* eslint-disable sort-keys */
export const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    clearAll: (state, _: PayloadAction<string>) => {
      state.marketPriceTop30 = {};
      state.error = '';
    },

  },
  // thunk 函数的return 是extraReducers addCase函数的action.payload
  extraReducers: (builder) => {
    builder

      .addCase(fetchMarketPrice.fulfilled, (state, action) => {
        // console.log('fulfiled');
        state.marketPriceTop30 = action.payload;
      })
      .addCase(fetchMarketPrice.rejected, (state, action) => {
        // console.log('type', typeof (action.payload))
        state.error = action.payload as string;
      })

  }
});

export const { clearAll } = coinSlice.actions;
export default coinSlice.reducer;
