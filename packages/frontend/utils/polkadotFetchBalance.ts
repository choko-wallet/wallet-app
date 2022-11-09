// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Network } from '@choko-wallet/core';
import type { BalanceInfo } from './types';

import { ApiPromise, WsProvider } from '@polkadot/api';

export const getPolkadotTokenBalance = async (network: Network, address: string): Promise<number> => {
  const provider = new WsProvider(network.defaultProvider);
  const api = await ApiPromise.create({ provider });

  /* eslint-disable */
  // @ts-ignore
  return Number( (await api.query.system.account(address)).toJSON().data.free );
  /* eslint-enable */
};

export const polkadotFetchBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  return {
    native: {
      balance: await getPolkadotTokenBalance(network, address) / Math.pow(10, network.nativeTokenDecimal),
      balanceInUSD: 15.0,
      img: `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${'dot'}.png`,
      name: network.info,
      priceInUSD: 5.0,
      symbol: network.nativeTokenSymbol
    }
  };
};
