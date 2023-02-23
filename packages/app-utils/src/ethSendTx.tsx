// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { BigNumber, ethers } from 'ethers';

import { encodeContractCall, encodeTransaction } from '@choko-wallet/abi';
import { DappDescriptor, Network, UserAccount } from '@choko-wallet/core';
import { SignTxType } from '@choko-wallet/core/types';
import { compressParameters } from '@choko-wallet/core/util';
import { buildSignTxUrl } from '@choko-wallet/sdk';

import { deploymentEnv, walletUrl } from './env';

export const encodeEthNativeTransaction = (
  receipientAddress: string,
  value: number
): string => {
  return encodeTransaction({
    to: receipientAddress,
    value: ethers.utils.parseEther(`${value}`)
  });
};

export const encodeEthERC20TokenTransaction = (
  tokenAddress: string,
  receipientAddress: string,
  value: number,
  decimal: number
): string => {
  const ten = BigNumber.from('10');

  return encodeTransaction({
    data: encodeContractCall('erc20', 'transfer', [
      receipientAddress, BigNumber.from(`${value}`).mul(ten.pow(decimal))
    ]),
    to: tokenAddress,
    value: '0x00'
  });
};

// Entry point
export const ethEncodeTxToUrl = (
  network: Network, userOrigin: UserAccount,

  tokenAddressOrNative: string,
  recepientAddress: string,
  value: number,
  decimal?: number
): string => {
  const dapp = new DappDescriptor({
    activeNetwork: network,
    displayName: 'Choko Wallet - Send',
    infoName: 'native-send',
    version: 0
  });

  let tx: string;

  if (tokenAddressOrNative === 'native') {
    tx = encodeEthNativeTransaction(recepientAddress, value);
  } else {
    if (!decimal) {
      throw new Error('must set token decimal on ERC20 token transfer');
    }

    tx = encodeEthERC20TokenTransaction(
      tokenAddressOrNative, recepientAddress, value, decimal
    );
  }

  return buildSignTxUrl({
    dappDescriptor: u8aToHex(compressParameters(dapp.serialize())),
    userAccount: u8aToHex(compressParameters(userOrigin.serialize()))
  },
  hexToU8a(tx.slice(2)),
  SignTxType.Gasless, `${walletUrl}/home`, deploymentEnv
  );
};
