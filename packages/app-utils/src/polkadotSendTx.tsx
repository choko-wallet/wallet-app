// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { DappDescriptor, Network, UserAccount } from '@choko-wallet/core';
import { SignTxType } from '@choko-wallet/core/types';
import { compressParameters } from '@choko-wallet/core/util';
import { buildSignTxUrl } from '@choko-wallet/sdk';
import getWalletUrl from '@choko-wallet/sdk/walletUrl';

const e = 'STAGING';
const walletUrl = getWalletUrl(e);

export const polkadotEncodeTxToUrl = async (
  network: Network, userOrigin: UserAccount,

  recepientAddress: string,
  value: number
): Promise<string> => {
  const dapp = new DappDescriptor({
    activeNetwork: network,
    displayName: 'Choko Wallet - Send',
    infoName: 'native-send',
    version: 0
  });

  const provider = new WsProvider(network.defaultProvider);// wss
  const api = await ApiPromise.create({ provider: provider });

  const tx = api.tx.balances.transfer(
    recepientAddress,
    (value * Math.pow(10, network.nativeTokenDecimal))
  ).toHex();

  return buildSignTxUrl({
    dappDescriptor: u8aToHex(compressParameters(dapp.serialize())),
    userAccount: u8aToHex(compressParameters(userOrigin.serialize()))
  },
  hexToU8a(tx.slice(2)),
  SignTxType.Ordinary, `${walletUrl}/home`, e);
};
