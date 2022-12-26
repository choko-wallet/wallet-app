// Copyright 2021-2022 @choko-wallet/frontend-utils-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type BalanceInfo = Record<string, CryptoBalance>;
export type CryptoBalance = {
  balance: number,
  balanceInUSD: number,
  decimals?: number,
  img: string,
  name: string,
  priceInUSD: number,
  symbol: string,
};

export type CoingeckoAPIResponse = Record<string, { [key: string]: number }>;
export type FormAPIResponse = {
  error: string,
  data: string,
}
