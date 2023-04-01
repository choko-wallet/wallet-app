// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { encodeAddress } from '@polkadot/util-crypto';

import { Network, UserAccount } from '@choko-wallet/core';

const encodeAddr = (network: Network, account: UserAccount): string => {
  if (network.networkType === 'polkadot') {
    return encodeAddress(account.publicKeys[0],
      network.ss58Prefix === undefined ? 42 : network.ss58Prefix);
  } else {
    return account.aaWalletAddress;
  }
};

const fetchAAWalletAddress = async (account: UserAccount[]): Promise<string[]> => {
  const len = account.length;
  const res: string[] = [];

  for (let i = 0; i < len; ++i) {
    res[i] = await account[i].getAAWwalletAddress();
  }

  return res;
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

export { fetchAAWalletAddress, encodeAddr };
export default encodeAddr;
