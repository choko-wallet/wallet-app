// Copyright 2021-2022 @choko-wallet/frontend-utils-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Alchemy, Network as alchemyNetwork } from 'alchemy-sdk';

import { Network } from '@choko-wallet/core';
import getWalletUrl from '@choko-wallet/sdk/walletUrl';

const alchemyKeys = {
  default: process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM,
  ethereum: process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM,
  goerli: process.env.NEXT_PUBLIC_ALCHEMY_ETH_GOERLI,
  polygon: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON,
  'polygon-mumbai': process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI
};

export const getAlchemy = (network: Network): Alchemy => {
  let config = {};

  switch (network.info) {
    case 'ethereum':
      config = {
        apiKey: alchemyKeys[network.info],
        network: alchemyNetwork.ETH_MAINNET
      };

      return new Alchemy(config);
    case 'goerli':
      config = {
        apiKey: alchemyKeys[network.info],
        network: alchemyNetwork.ETH_GOERLI
      };

      return new Alchemy(config);
    case 'optimism':
      config = {
        apiKey: alchemyKeys.default,
        network: alchemyNetwork.OPT_MAINNET
      };

      return new Alchemy(config);
    case 'optimism-goerli':
      config = {
        apiKey: alchemyKeys.default,
        network: alchemyNetwork.OPT_GOERLI
      };

      return new Alchemy(config);
    case 'arbitrum':
      config = {
        apiKey: alchemyKeys.default,
        network: alchemyNetwork.ARB_MAINNET
      };

      return new Alchemy(config);
    case 'arbitrum-goerli':
      config = {
        apiKey: alchemyKeys.default,
        network: alchemyNetwork.ARB_GOERLI
      };

      return new Alchemy(config);
    case 'polygon':
      config = {
        apiKey: alchemyKeys[network.info],
        network: alchemyNetwork.MATIC_MAINNET
      };

      return new Alchemy(config);
    case 'polygon-mumbai':
      config = {
        apiKey: alchemyKeys[network.info],
        network: alchemyNetwork.MATIC_MUMBAI
      };

      return new Alchemy(config);
    default:
      config = {
        apiKey: alchemyKeys.default,
        network: alchemyNetwork.ETH_MAINNET
      };

      return new Alchemy(config);
  }
};

export const deploymentEnv = process.env.NEXT_PUBLIC_ENV;
export const walletUrl = getWalletUrl(deploymentEnv);
export { };
