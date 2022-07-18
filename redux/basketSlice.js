import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  origin: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {//当前状态state.items 
    addToBasket: (state, action) => {
      //dispatch(addToBasket(product));传参数是object 接参数是action.payload不写product
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn('not in basket');
      }
      state.items = newBasket;
    },

    setOrigin: (state, action) => {
      state.origin = action.payload;
    },//两个变量 一个items是arr origin可以是任何类型
  },
});

export const { addToBasket, removeFromBasket, setOrigin } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.id, 0);
export const selectOrigin = (state) => state.basket.origin;
// slice里面直接state.items slice外面state.basket.items 明确哪个slice 

export default basketSlice.reducer;
