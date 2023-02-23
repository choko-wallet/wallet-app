// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Network } from '@choko-wallet/core';
import type { BalanceInfo, CoingeckoAPIResponse } from './types';

import { ApiPromise, WsProvider } from '@polkadot/api';

const fetchNativeAssetPrice = async (name: string, currency: string): Promise<number> => {
  const price = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${currency}`).then((res) => res.json()) as CoingeckoAPIResponse;

  return price[name][currency];
};

export const getPolkadotTokenBalance = async (network: Network, address: string): Promise<number> => {
  const provider = new WsProvider(network.defaultProvider);
  const api = await ApiPromise.create({ provider });

  /* eslint-disable */
  // @ts-ignore
  return Number((await api.query.system.account(address)).toJSON().data.free);
  /* eslint-enable */
};

export const polkadotFetchBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  const balance = await getPolkadotTokenBalance(network, address) / Math.pow(10, network.nativeTokenDecimal);

  if (!network.isDevelopment) {
    const price = await fetchNativeAssetPrice(network.info, 'usd');

    return {
      native: {
        balance: balance,
        balanceInUSD: balance * price,
        img: `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${network.nativeTokenSymbol.toLowerCase()}.png`,
        name: network.info,
        priceInUSD: price,
        symbol: network.nativeTokenSymbol
      }
    };
  } else {
    return {
      native: {
        balance: balance,
        balanceInUSD: 0,
        img: `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${'dot'}.png`,
        name: network.info,
        priceInUSD: 0,
        symbol: network.nativeTokenSymbol
      }
    };
  }
};
