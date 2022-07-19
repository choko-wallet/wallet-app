import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'



// interface CounterState {
//   value: number
// }

// // Define the initial state using that type
// const initialState: CounterState = {
//   value: 0
// }


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
  items: [],
  // origin: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      // 强制传入Item格式
      //dispatch(addToBasket(product));传参数是object 接参数是action.payload不写product
      state.items = [...state.items, action.payload]
    },
    addToBasketString: (state, action: PayloadAction<string>) => {
      // 强制传入string
      state.items = [...state.items,
      {
        id: 666,
        account: action.payload,
        pro: true,
        city: {
          country: "Thailand",
          city: "Bangkok"
        }
      }]
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn('not in basket');
      }
      state.items = newBasket;
    },

    // setOrigin: (state, action) => {
    //   state.origin = action.payload;
    // },//两个变量 一个items是arr origin可以是任何类型
  },
});

export const { addToBasket, removeFromBasket, addToBasketString } = basketSlice.actions;

export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) => state.basket.items.reduce((total, item) => total + item.id, 0);
// export const selectOrigin = (state) => state.basket.origin;
// slice里面直接state.items slice外面state.basket.items 明确哪个slice 

export default basketSlice.reducer;
