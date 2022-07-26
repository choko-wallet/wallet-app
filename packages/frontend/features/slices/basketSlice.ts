// [object Object]
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
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    addToBasketString: (state, action: PayloadAction<string>) => {
      state.items = [...state.items,
        {
          id: 666,
          account: action.payload,
          pro: true,
          city: {
            country: 'Thailand',
            city: 'Bangkok'
          }
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
