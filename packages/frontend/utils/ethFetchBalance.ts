// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TokenMetadataResponse } from 'alchemy-sdk';
import type { BalanceInfo, CoingeckoAPIResponse } from './types';

import { Alchemy, Network as alchemyNetwork } from 'alchemy-sdk';

import { Network } from '@choko-wallet/core';

/* eslint-disable sort-keys */
const notShitcoinFilter = (metadata: TokenMetadataResponse): boolean => {
  return metadata.symbol && metadata.name &&
    metadata.symbol.length <= 8 &&
    metadata.symbol.indexOf('.') === -1;
};

const getAlchemy = (network: Network): Alchemy => {
  let config = {};

  switch (network.info) {
    case 'ethereum':
      config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETH_MAIN,
        network: alchemyNetwork.ETH_MAINNET
      };

      return new Alchemy(config);
    case 'goerli':
      config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETH_GOERLI,
        network: alchemyNetwork.ETH_GOERLI
      };

      return new Alchemy(config);
    case 'optimism':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.OPT_MAINNET
      };

      return new Alchemy(config);
    case 'optimism-goerli':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.OPT_GOERLI
      };

      return new Alchemy(config);
    case 'arbitrum':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.ARB_MAINNET
      };

      return new Alchemy(config);
    case 'arbitrum-goerli':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.ARB_GOERLI
      };

      return new Alchemy(config);
    case 'polygon':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.MATIC_MAINNET
      };

      return new Alchemy(config);
    case 'polygon-mumbai':
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.MATIC_MUMBAI
      };

      return new Alchemy(config);
    default:
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemyNetwork.ETH_MAINNET
      };

      return new Alchemy(config);
  }
};

const getTokenImage = (network: Network): string => {
  switch (network.info) {
    case 'ethereum' || 'goerli':
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
    case 'optimism' || 'optimism-goerli':
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
    case 'arbitrum' || 'arbitrum-goerli':
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
    case 'polygon' || 'polygon-mumbari' || 'polygon-goerli':
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png';
    default:
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
  }
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
          img: b.img,
          name: b.name,
          priceInUSD: price[address],
          symbol: b.symbol
        }];
      } else return [address, b];
    })
  );
};

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
  console.log('fetchNativeAssetBalanceAndPrice');

  const alchemy = getAlchemy(network);

  const divBy = decimals >= 6 ? decimals - 6 : decimals;

  const result: BalanceInfo = {};
  const nativeBalance = Number((await alchemy.core.getBalance(address)).div('0x' + Math.pow(10, divBy).toString(16)).toNumber() / Math.pow(10, decimals - divBy));

  let nativePrice;

  try {
    nativePrice = await fetchNativeAssetPrice(name, currency);
  } catch (e) {
    console.log('fetchNativeAssetPrice-err', e);
    nativePrice = 0;// 需要个try catch
  }

  console.log('nativePrice', nativePrice);

  result.native = {
    balance: nativeBalance,
    img: getTokenImage(network),
    name: name,
    symbol: network.nativeTokenSymbol,
    priceInUSD: nativePrice,
    balanceInUSD: nativeBalance * nativePrice
  };
  console.log('fetchNativeAssetBalanceAndPrice-result', result);

  return result;
};

export const fetchTokenBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  const alchemy = getAlchemy(network);

  console.log('network-address', network, address);

  // const rawBalances = await alchemy.core.getTokenBalances(address, {
  //   type: TokenBalanceType.DEFAULT_TOKENS
  // });
  const rawBalances = await alchemy.core.getTokenBalances(address);// 加第二个参数就拿不到goerli测试币 chainlink
  const result: BalanceInfo = {};

  console.log('rawBalances', rawBalances);

  await Promise.all(rawBalances.tokenBalances.map(async (token) => {
    if (Number(token.tokenBalance) !== 0) {
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

      if (notShitcoinFilter(metadata)) {
        // Ok.. we have a non-zero balance, non shitcoin token

        // 1. push the contract address to coingeckPayload
        result[token.contractAddress] = {
          balance: Number(Number(token.tokenBalance) / Math.pow(10, metadata.decimals)),
          balanceInUSD: 0,
          img: metadata.logo,
          name: metadata.name,
          priceInUSD: 0,
          symbol: metadata.symbol
        };
      }
    }
  }));
  console.log('result', result);

  return result;
};

export const ethFetchBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  const tokenBalance = await fetchTokenBalance(network, address);

  const tokenAddressBatch = Object.keys(tokenBalance);

  console.log('tokenAddressBatch', tokenAddressBatch);

  let tokenPrice = {};

  if (network.info === 'ethereum') {
    // only fetch on ethereum?
    tokenPrice = await fetchBatchTokenPrice(tokenAddressBatch, 'usd');
  }

  if (network.info === 'goerli') {
    tokenPrice = 0;
  }

  const nativeAssetBalanceAndPrice = await fetchNativeAssetBalanceAndPrice(network, address, network.info, 'usd', 18);

  return {
    ...nativeAssetBalanceAndPrice,
    ...sortBalance(populateTokenPriceToBalance(tokenBalance, tokenPrice))
  };
};
