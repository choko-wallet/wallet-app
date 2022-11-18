// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TokenMetadataResponse } from 'alchemy-sdk';
import type { BalanceInfo, CoingeckoAPIResponse, CryptoBalance } from './types';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { Alchemy, Network as alchemyNetwork } from 'alchemy-sdk';

import { AccountOption, DappDescriptor, Network, UserAccount } from '@choko-wallet/core';
import { knownNetworks } from '@choko-wallet/known-networks';

import { compressParameters, xxHash } from '@choko-wallet/core/util';
import { ethers } from 'ethers';
import { encodeContractCall } from '@choko-wallet/abi';
import { SignTxDescriptor, SignTxRequest, SignTxRequestPayload, SignTxResponse } from '@choko-wallet/request-handler';
import { Keyring } from '@polkadot/api';

const seed = 'humor cook snap sunny ticket distance leaf unusual join business obey below';//0.5goerli 22link

const LinkTokenABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';

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


export const ethSendTx = async (request: SignTxRequest): Promise<SignTxResponse> => {
  const account = new UserAccount(new AccountOption({
    hasEncryptedPrivateKeyExported: false,
    keyType: 'ethereum',
    localKeyEncryptionStrategy: 0
  }));

  const seed = 'humor cook snap sunny ticket distance leaf unusual join business obey below';//0.5goerli 22link
  console.log('account', account);

  const mnemonicWallet = ethers.Wallet.fromMnemonic(seed);

  account.unlock(hexToU8a((mnemonicWallet.privateKey).slice(2)));
  await account.init();
  console.log('5');
  console.log('account2', account);//私钥没变？

  // update the keyType manually
  account.option.keyType = 'ethereum';
  console.log('account3', account);

  const kr = (new Keyring({
    type: 'ethereum'
  })).addFromUri('0x' + u8aToHex(account.privateKey));
  console.log("kr address: ", kr.address);

  // const sendResponse = await signTx.requestHandler(request, account);//调用这个发送 在sdk中
  // console.log('sendResponse: ', sendResponse);

  const signTx = new SignTxDescriptor();
  const response = await signTx.requestHandler(request, account);//用测试账户
  // const response = await signTx.requestHandler(request, currentUserAccount);
  return response;

}

// Entry point
export const ethEncodeTxToUrl = async (network: Network, cryptoToSend: CryptoBalance, amount: number, addressToSend: string, balanceInfo: BalanceInfo): Promise<string> => {

  // const chainId = 5;
  const chainId = 80001;

  const dapp = new DappDescriptor({
    // activeNetwork: knownNetworks[u8aToHex(xxHash('goerli'))],
    activeNetwork: knownNetworks[u8aToHex(xxHash('polygon-mumbai'))],
    displayName: 'Jest Testing',
    infoName: 'Test',
    version: 0
  });


  const account = new UserAccount(new AccountOption({
    hasEncryptedPrivateKeyExported: false,
    keyType: 'ethereum',
    localKeyEncryptionStrategy: 0
  }));
  const mnemonicWallet = ethers.Wallet.fromMnemonic(seed);//用seed生成的测试账户 
  console.log('1');

  account.unlock(hexToU8a((mnemonicWallet.privateKey).slice(2)));
  await account.init();
  account.lock();
  let tx = {};

  if (cryptoToSend === balanceInfo.native) {//native token
    tx = {
      chainId: chainId,
      to: addressToSend,
      value: ethers.utils.parseEther(amount.toString()),
      // value: ethers.utils.parseEther('0.001'),
    };

  } else {//erc20 token

    const data = encodeContractCall(
      '',
      'transfer',
      [
        addressToSend,//接收地址 
        '1'  // send （0.1 * decimal).toString Link token  
      ],
      LinkTokenABI
    )
    console.log("data: ", data);

    tx = {
      chainId: chainId,
      to: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // goerli link token contract address
      data: data,//接收地址在这里
    }
  }


  const serializedTx = ethers.utils.serializeTransaction(tx);
  console.log('2', serializedTx);//长字符串 

  const request = new SignTxRequest({
    dappOrigin: dapp,
    payload: new SignTxRequestPayload({
      encoded: hexToU8a(serializedTx.slice(2))
    }),
    userOrigin: account
  });
  console.log('3');

  const serialized = request.serialize();//uint8 array 767位
  const hexRequest = u8aToHex(compressParameters(serialized))

  console.log('3', hexRequest);

  const redirectUrl = `http://localhost:3000/request/sign-tx?requestType=signTx&payload=${hexRequest}&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome`

  return redirectUrl

};
