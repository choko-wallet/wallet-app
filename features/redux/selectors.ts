import type { RootState } from '../redux/store'

// count selectors
export const selectCount = (state: RootState) => state.counter.value

// basket selectors
export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) => state.basket.items.reduce((total, item) => total + item.id, 0);