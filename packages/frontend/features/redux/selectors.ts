// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { UserAccount } from '@choko-wallet/core';

interface SingelCoinData {
  id: string;
  // currentPrice: number;
  // many fields
}

type MarketData = Array<SingelCoinData>

/* eslint-disable */
// userAccount selectors
export const selectCurrentUserAccount = (state: RootState): UserAccount => state.user.currentUserAccount;
export const selectUserAccount = (state: RootState): { [key: string]: UserAccount } => state.user.userAccount;

export const selectError = (state: RootState): string => state.user.error;
export const selectMarketPriceTop30 = (state: RootState): MarketData => state.coin.marketPriceTop30;
export const selectCoinApiLoading = (state: RootState): string => state.coin.loading;
export const selectChangeCurrentAccountLoading = (state: RootState): boolean => state.user.changeCurrentAccountLoading;



/* eslint-enable */
