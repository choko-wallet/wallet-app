// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { UserAccount } from '@choko-wallet/core';

type CoinData = Array<CoinPrice>

interface CoinPrice {
  [key: string]: PriceUsd
}

interface PriceUsd {
  usd: number;
}

/* eslint-disable */
// userAccount selectors
export const selectCurrentUserAccount = (state: RootState): UserAccount => state.user.currentUserAccount;
export const selectUserAccount = (state: RootState): { [key: string]: UserAccount } => state.user.userAccount;

export const selectError = (state: RootState): string => state.user.error;
// export const selectDecryptCurrentUserAccountResult = (state: RootState): string => state.user.decryptCurrentUserAccountResult;

export const selectCoinPrice = (state: RootState): CoinData => state.coin.coinPrice;
export const selectCoinApiLoading = (state: RootState): string => state.coin.loading;
export const selectChangeCurrentAccountLoading = (state: RootState): boolean => state.user.changeCurrentAccountLoading;



/* eslint-enable */
