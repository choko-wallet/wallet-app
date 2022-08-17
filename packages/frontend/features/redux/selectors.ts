// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';
import { UserAccount } from '@choko-wallet/core';

interface Item {
  id: number;
  account: string;
  pro: boolean;
  city: {
    country: string,
    city: string
  }
}

/* eslint-disable */
// count selectors
export const selectCount = (state: RootState): number => state.counter.value;

// basket selectors
export const selectItems = (state: RootState): Item[] => state.basket.items;

// userAccount selectors
export const selectSeeds = (state: RootState): string => state.user.seeds;
export const selectPassword = (state: RootState): string => state.user.password;
export const selectUserAccount = (state: RootState): UserAccount => state.user.userAccount;
export const selectError = (state: RootState): boolean => state.user.error;

// @ts-ignore
export const selectTotal = (state: RootState): number => state.basket.items.reduce((total, item) => total + item.id, 0);

/* eslint-enable */
