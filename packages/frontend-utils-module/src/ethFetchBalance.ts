// Copyright 2021-2022 @choko-wallet/frontend-utils-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TokenMetadataResponse } from 'alchemy-sdk';
import type { BalanceInfo, CoingeckoAPIResponse } from './types';

import { Network } from '@choko-wallet/core';

import { getAlchemy } from './env';

/* eslint-disable sort-keys */
const notShitcoinFilter = (metadata: TokenMetadataResponse): boolean => {
  return metadata.symbol && metadata.name &&
    metadata.symbol.length <= 8 &&
    metadata.symbol.indexOf('.') === -1;
};

const getTokenImage = (network: Network): string => {
  if (network.info.indexOf('polygon') !== -1) {
    return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png';
  }

  return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';

  // switch (network.info) {
  //   case 'ethereum' || 'goerli':
  //     return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
  //   case 'optimism' || 'optimism-goerli':
  //     return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
  //   case 'arbitrum' || 'arbitrum-goerli':
  //     return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
  //   default:
  //     console.log(network.info)
  //     return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
  // }
};

const getNativeAssetCoingeckoId = (networkInfo: string): string => {
  switch (networkInfo) {
    case 'ethereum': return 'ethereum';
    case 'polygon': return 'matic-network';
    default: return '';
  }
};

const fetchNativeAssetPrice = async (name: string, currency: string): Promise<number> => {
  const coingeckoId = getNativeAssetCoingeckoId(name);

  const price = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=${currency}`).then((res) => res.json()) as CoingeckoAPIResponse;

  return price[coingeckoId][currency];
};

const populateTokenPriceToBalance = (balance: BalanceInfo, price: Record<string, number>): BalanceInfo => {
  return Object.fromEntries(
    Object.entries(balance).map(([address, b]) => {
      if (price[address]) {
        return [address, {
          balance: b.balance,
          balanceInUSD: price[address] * b.balance,
          decimals: b.decimals,
          img: b.img,
          name: b.name,
          priceInUSD: price[address],
          symbol: b.symbol
        }];
      } else return [address, b];
    })
  );
};

// Fetch token price from a batch of contract address on ethereum
// The URL might be very large. However, tested with 100+ tokens, it still works well.
// There is very little likelyhood a user hold that much of shitcoins
const fetchBatchTokenPrice = async (address: string[], currency: string): Promise<Record<string, number>> => {
  const payloadBase = 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=';
  const payloadWhole = `${payloadBase}${address.reduce((pre, i) => { return pre + i + ','; }, '')}&vs_currencies=${currency}`;
  const price = await fetch(payloadWhole).then((r) => r.json()) as CoingeckoAPIResponse;

  const res: Record<string, number> = {};

  for (const addr of address) {
    if (price[addr]) {
      res[addr] = price[addr][currency];
    } else {
      res[addr] = 0;
    }
  }

  return res;
};

const sortBalance = (original: BalanceInfo): BalanceInfo => {
  return Object.fromEntries(Object.entries(original).sort(([_, a], [__, b]) => {
    return b.balanceInUSD - a.balanceInUSD;
  }));
};

export const fetchNativeAssetBalanceAndPrice = async (network: Network, address: string, name: string, currency: string, decimals: number): Promise<BalanceInfo> => {
  const alchemy = getAlchemy(network);

  const divBy = decimals >= 6 ? decimals - 6 : decimals;

  const result: BalanceInfo = {};
  const nativeBalance = Number((await alchemy.core.getBalance(address)).div('0x' + Math.pow(10, divBy).toString(16)).toNumber() / Math.pow(10, decimals - divBy));

  let nativePrice;

  try {
    nativePrice = await fetchNativeAssetPrice(name, currency);
  } catch (e) {
    console.log('fetchNativeAssetPrice-err', e);
    nativePrice = 0;
  }

  result.native = {
    balance: nativeBalance,
    img: getTokenImage(network),
    decimals: decimals, // eth polygon 18
    name: name,
    symbol: network.nativeTokenSymbol,
    priceInUSD: nativePrice,
    balanceInUSD: nativeBalance * nativePrice
  };

  return result;
};

export const fetchTokenBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  const alchemy = getAlchemy(network);

  // const rawBalances = await alchemy.core.getTokenBalances(address, {
  //   type: TokenBalanceType.DEFAULT_TOKENS
  // });
  const rawBalances = await alchemy.core.getTokenBalances(address);
  const result: BalanceInfo = {};

  await Promise.all(rawBalances.tokenBalances.map(async (token) => {
    if (Number(token.tokenBalance) !== 0) {
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

      if (notShitcoinFilter(metadata)) {
        // Ok.. we have a non-zero balance, non shitcoin token

        // 1. push the contract address to coingeckPayload
        result[token.contractAddress] = {
          balance: Number(Number(token.tokenBalance) / Math.pow(10, metadata.decimals)),
          balanceInUSD: 0,
          decimals: metadata.decimals,
          img: metadata.logo,
          name: metadata.name,
          priceInUSD: 0,
          symbol: metadata.symbol
        };
      }
    }
  }));

  return result;
};

// Entry point
export const ethFetchBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  // 1. Fetch ERC20 token balance
  const tokenBalance = await fetchTokenBalance(network, address);

  const tokenAddressBatch = Object.keys(tokenBalance);
  let tokenPrice = {};

  if (network.info === 'ethereum') {
    // only fetch on ethereum? and skip other chains. Contract address might be different?
    // 2. fetch ERC20 token price
    tokenPrice = await fetchBatchTokenPrice(tokenAddressBatch, 'usd');
  }

  if (network.info === 'goerli') {
    tokenPrice = 0;
  }

  // 3. for native assets, we can fetch token balance & price at the same time
  const nativeAssetBalanceAndPrice = await fetchNativeAssetBalanceAndPrice(network, address, network.info, 'usd', 18);

  // 4. populate tokenPrice into token balance & sort by balanceInUSD
  // Native asset always at top
  return {
    ...nativeAssetBalanceAndPrice,
    ...sortBalance(populateTokenPriceToBalance(tokenBalance, tokenPrice))
  };
};
