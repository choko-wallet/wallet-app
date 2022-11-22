// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type BalanceInfo = Record<string, CryptoBalance>;
export type CryptoBalance = {
  balance: number,
  balanceInUSD: number,
  img: string,
  name: string,
  priceInUSD: number,
  symbol: string,
};

export type CryptoBalanceWithAddress = {
  [key: string]: {
    balance: number,
    balanceInUSD: number,
    img: string,
    name: string,
    priceInUSD: number,
    symbol: string,
  }
};

export type CoingeckoAPIResponse = Record<string, { [key: string]: number }>;
