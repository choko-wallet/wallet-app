// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TokenMetadataResponse } from 'alchemy-sdk';
import type { BalanceInfo, CoingeckoAPIResponse } from './types';

import { Alchemy, Network as alchemyNetwork } from 'alchemy-sdk';

import { Network } from '@choko-wallet/core';



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





// Entry point
export const ethSendTx = async (network: Network, address: string): Promise<BalanceInfo> => {

};
