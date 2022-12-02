// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { encodeAddress } from '@polkadot/util-crypto';

import { chainIdToProvider, INetwork, Network, UserAccount } from '@choko-wallet/core';
import { biconomyFixtures, callDataDeployWallet, sendBiconomyTxPayload } from '@choko-wallet/account-abstraction';
import { sleep } from '@skyekiwi/util';

const encodeAddr = (network: Network, account: UserAccount): string => {
  console.log(account);
  if (network.networkType === 'polkadot') {
    return encodeAddress(account.publicKeys[0],
      network.ss58Prefix === undefined ? 42 : network.ss58Prefix);
  } else {
    return account.aaWalletAddress;
  }
};


// const encodeAddr = async(network: Network, account: UserAccount): Promise<string> => {
//   if (network.networkType === 'polkadot') {
//     const provider = new WsProvider(network.defaultProvider);
//     const api = await ApiPromise.create({ provider });
//     const rawSs58Prefix = Number((await api.consts.system.ss58Prefix).toString());
//     if (rawSs58Prefix !== NaN) {
//       return encodeAddress(account.publicKeys[0], rawSs58Prefix);
//     } else {
//       return encodeAddress(account.publicKeys[0], 42);
//     }
//   } else {
//     return ethereumEncode(account.publicKeys[2]);
//   }
// }
// export { encodeAddr, deployAAContracct };

export default encodeAddr;