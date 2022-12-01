// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { DappDescriptor, Network, UserAccount } from '@choko-wallet/core';
import { BigNumber, ethers } from 'ethers';
import { encodeContractCall, encodeTransaction } from '@choko-wallet/abi';
import { SignTxType } from '@choko-wallet/core/types';
import { buildSignTxUrl } from '@choko-wallet/sdk';
import { compressParameters } from '@choko-wallet/core/util';

// export const ethSendTx = async (request: SignTxRequest, currentUserAccount: UserAccount): Promise<SignTxResponse> => {

//   // const account = new UserAccount(new AccountOption({
//   //   hasEncryptedPrivateKeyExported: false,
//   //   keyType: 'ethereum',
//   //   localKeyEncryptionStrategy: 0
//   // }));

//   // const privateKey = '72c7ed523e0084a99d2419a30332dc0d83d6d61f4d4a6b3dc3a38f7cb3588d80';
//   // const mnemonicWallet = ethers.Wallet.fromMnemonic(seed);
//   // account.unlock(hexToU8a((mnemonicWallet.privateKey).slice(2)));
//   // await account.init();
//   // // update the keyType manually
//   // account.option.keyType = 'ethereum';
//   // console.log('account3', account);
//   // const kr = (new Keyring({
//   //   type: 'ethereum'
//   // })).addFromUri('0x' + u8aToHex(account.privateKey));
//   // console.log("kr address: ", kr.address);

//   currentUserAccount.option.keyType = 'ethereum';

//   const signTx = new SignTxDescriptor();
//   // const response = await signTx.requestHandler(request, account);
//   const response = await signTx.requestHandler(request, currentUserAccount);
//   return response;

// }

export const encodeEthNativeTransaction = (
  receipientAddress: string,
  value: number,
): string => {
  return encodeTransaction({
    to: receipientAddress,
    value: ethers.utils.parseEther(`${value}`).toString(),
  });
}

export const encodeEthERC20TokenTransaction = (
  tokenAddress: string,
  receipientAddress: string,
  value: number,
  decimal: number
): string => {

  const ten = BigNumber.from('10');

  return encodeTransaction({
    to: tokenAddress,
    value: "0x00",
    data: encodeContractCall('erc20', 'transfer', [
      receipientAddress, ten.pow(decimal).mul(value)
    ])
  })
}

// Entry point
export const ethEncodeTxToUrl = (
  network: Network, userOrigin: UserAccount,

  tokenAddressOrNative: string,
  recepientAddress: string,
  value: number,
  decimal?: number,
): string => {

  const dapp = new DappDescriptor({
    activeNetwork: network,
    displayName: 'Choko Wallet - Send',
    infoName: 'native-send',
    version: 0,
  });

  let tx: string;
  if (tokenAddressOrNative === 'native') {
    tx = encodeEthNativeTransaction(recepientAddress, value);
  } else {
    if (!decimal) {
      throw new Error("must set token decimal on ERC20 token transfer");
    }
    tx = encodeEthERC20TokenTransaction(
      tokenAddressOrNative, recepientAddress, value, decimal,
    )
  }

  console.log( dapp.serialize().length, DappDescriptor.serializedLength() )
  return buildSignTxUrl({
    dappDescriptor: u8aToHex( compressParameters( dapp.serialize() ) ),
    userAccount: u8aToHex( compressParameters( userOrigin.serialize() ) ),
  }, 
    hexToU8a(tx.slice(2)), 
    SignTxType.Ordinary, 
    'http://localhost:3000/home', 
    'LOCAL'
  );
};
