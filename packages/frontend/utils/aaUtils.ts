// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { encodeAddress, ethereumEncode } from '@polkadot/util-crypto';

import { getSmartWalletAddress } from '@choko-wallet/account-abstraction';
import { chainIdToProvider, Network, UserAccount } from '@choko-wallet/core';

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
  const res = [];

  for (let i = 0; i < len; ++i) {
    const eoa = ethereumEncode(account[i].publicKeys[2]);

    const aa = await getSmartWalletAddress(
      chainIdToProvider[5], // TOOD: remove this shit as it's all the same for accounts
      eoa
    );

    res[i] = aa;
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
