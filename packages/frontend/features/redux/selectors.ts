// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

import type { RootState } from '../redux/store';

interface Item {
  id: number;
  account: string;
  pro: boolean;
  city: {
    country: string,
    city: string
  }
}

// count selectors
export const selectCount = (state: RootState): number => state.counter.value;

// basket selectors
export const selectItems = (state: RootState): Item[] => state.basket.items;
export const selectTotal = (state: RootState): number => state.basket.items.reduce((total, item) => total + item.id, 0);
