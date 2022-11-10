// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Network, UserAccount } from '@choko-wallet/core';
import { encodeAddress, ethereumEncode } from '@polkadot/util-crypto';

const encodeAddr = (network: Network, account: UserAccount): string => {
  if (network.networkType === 'polkadot') {
    return encodeAddress(account.publicKeys[0],
      network.ss58Prefix === undefined ? 42 : network.ss58Prefix);
  } else {
    return ethereumEncode(account.publicKeys[2]);
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
export default encodeAddr;
