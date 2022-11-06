import type { BalanceInfo } from './types';
import type { TokenMetadataResponse } from 'alchemy-sdk'

import { Alchemy, Network as alchemyNetwork, TokenBalanceType } from "alchemy-sdk";
import { Network } from '@choko-wallet/core';

const notShitcoinFilter = (metadata: TokenMetadataResponse) => {
  return metadata.symbol && metadata.name
    && metadata.symbol.length <= 8
    && metadata.symbol.indexOf(".") === -1
};

const getAlchemy = (): Alchemy => {
  const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: alchemyNetwork.ETH_MAINNET,
  };
  return new Alchemy(config);
}

const fetchNativeAssetPrice = async (name: string, currency: string): Promise<number> => {
  const price = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${currency}`).then(res => res.json());
  return price[name][currency]
}

const populateTokenPriceToBalance = (balance: BalanceInfo, price: Record<string, number>): BalanceInfo => {
  return Object.fromEntries(
    Object.entries(balance).map(([address, b]) => {
      if (price[address])
        return [address, {
          balance: b.balance,
          img: b.img,
          name: b.name,
          symbol: b.symbol,
          priceInUSD: price[address],
          balanceInUSD: price[address] * b.balance,
        }]
      else return [address, b];
    })
  )
}

const fetchBatchTokenPrice = async (address: string[], currency: string): Promise<Record<string, number>> => {
  const payloadBase = "https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=";
  const payloadWhole = `${payloadBase}${
    address.reduce((pre, i) => { return pre += i + "," }, "")
  }&vs_currencies=${currency}`;

  const price = await fetch(payloadWhole).then(r => r.json());
  let res: Record<string, number> = {};
  for (const addr of address) {
    if (price[addr]) {
      res[addr] = price[addr][currency]
    } else {
      res[addr] = 0;
    }
  }
  return res;
}

const sortBalance = (original: BalanceInfo): BalanceInfo => {
  return Object.fromEntries(Object.entries(original).sort(([idA, a], [idB, b]) => {
    return b.balanceInUSD - a.balanceInUSD;
  }));
}

export const fetchNativeAssetBalanceAndPrice = async (address: string, name: string, currency: string, decimals: number): Promise<BalanceInfo> => {
  const alchemy = getAlchemy();

  const divBy = decimals >= 6 ? decimals - 6 : decimals;

  let result: BalanceInfo = {}
  const nativeBalance = Number((await alchemy.core.getBalance(address)).div("0x" + Math.pow(10, divBy).toString(16)).toNumber() / Math.pow(10, decimals - divBy));
  const nativePrice = await fetchNativeAssetPrice(name, currency);

  result["native"] = {
    balance: nativeBalance,
    img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png", // TODO: Change me
    name: name,
    symbol: "ETH", // TODO: Change me
    priceInUSD: nativePrice,
    balanceInUSD: nativeBalance * nativePrice,
  }

  return result;
}

export const fetchTokenBalance = async (address: string): Promise<BalanceInfo> => {
  const alchemy = getAlchemy();

  const rawBalances = await alchemy.core.getTokenBalances(address, {
    type: TokenBalanceType.DEFAULT_TOKENS
  });
  let result: BalanceInfo = {};
  await Promise.all(rawBalances.tokenBalances.map(async (token) => {
    if (Number(token.tokenBalance) !== 0) {
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
      if (notShitcoinFilter(metadata)) {
        // Ok.. we have a non-zero balance, non shitcoin token

        // 1. push the contract address to coingeckPayload
        result[token.contractAddress] = {
          balance: Number(Number(token.tokenBalance) / Math.pow(10, metadata.decimals)),
          img: metadata.logo,
          name: metadata.name,
          symbol: metadata.symbol,
          priceInUSD: 0,
          balanceInUSD: 0,
        };
      }
    }
  }));

  return result;
}

export const ethFetchBalance = async (network: Network, address: string): Promise<BalanceInfo> => {
  const tokenBalance = await fetchTokenBalance(address);
  

  const tokenAddressBatch = Object.entries(tokenBalance).map(i => i[0]);
  const tokenPrice = await fetchBatchTokenPrice(tokenAddressBatch, 'usd');
  
  const nativeAssetBalanceAndPrice = await fetchNativeAssetBalanceAndPrice(address, 'ethereum', 'usd', 18);
  
  return {
    ...nativeAssetBalanceAndPrice,
    ...sortBalance( populateTokenPriceToBalance(tokenBalance, tokenPrice) )
  };
}
