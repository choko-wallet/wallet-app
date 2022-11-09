// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type BalanceInfo = Record<string, CryptoBalance>;
export type CryptoBalance = {
  balance: number,
  img: string,
  name: string,
  symbol: string,
  priceInUSD: number,
  balanceInUSD: number,
};
