// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  account: string;
  pro: boolean;
  city: {
    country: string,
    city: string
  }
}

interface ItemsSliceState {
  items: Item[];
}

const initialState: ItemsSliceState = {
  items: []
};

export const basketSlice = createSlice({
  initialState,
  name: 'basket',

  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    addToBasketString: (state, action: PayloadAction<string>) => {
      state.items = [...state.items,
        {
          account: action.payload,
          city: {
            city: 'Bangkok',
            country: 'Thailand'
          },
          id: 666,
          pro: true

        }];
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload);
      const newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn('not in basket');
      }

      state.items = newBasket;
    }
  }
});

export const { addToBasket, addToBasketString, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
