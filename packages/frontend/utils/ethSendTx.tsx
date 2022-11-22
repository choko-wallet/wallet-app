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


const MumbaiDaiTokenABI = '[{ "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]';


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

  // const privateKey = '72c7ed523e0084a99d2419a30332dc0d83d6d61f4d4a6b3dc3a38f7cb3588d80';
  const seed = 'humor cook snap sunny ticket distance leaf unusual join business obey below';
  //29ee   0.5goerli 22link   0.18matic 100dai  
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

export const getChainId = (network: Network): number => {
  if (network.info === 'ethereum') {
    return 1
  }
  if (network.info === 'goerli') {
    return 5
  }
  if (network.info === 'polygon') {
    return 137
  }
  if (network.info === 'polygon-mumbai') {
    return 80001
  }

  return 100000000000000;
}

// Entry point
export const ethEncodeTxToUrl = async (network: Network, cryptoToSend: CryptoBalance, amount: number, addressToSend: string, balanceInfo: BalanceInfo): Promise<string> => {

  const chainId = getChainId(network);
  console.log('chainId', chainId)

  const dapp = new DappDescriptor({
    activeNetwork: knownNetworks[u8aToHex(xxHash(network.info))],
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

    // 需要token的abi decimals 合约地址
    // metadata.decimals 在这用alchemy获取？ 应该切换网络时获取 把decimals和合约地址都写到cryptoToSend中 传过来 
    // console.log('erc20 amount', (amount * Math.pow(10, 18)).toString())

    const data = encodeContractCall(
      '',
      'transfer',
      [
        addressToSend,//接收地址 
        (amount * Math.pow(10, 18)).toString(),//18是link-goerli
        // 'link'//直接这么加不行 
      ],
      LinkTokenABI
      // MumbaiDaiTokenABI,
    )
    console.log("data: ", data);

    tx = {
      chainId: chainId,
      to: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // goerli link token contract address
      // to: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F', // mumbai dai token contract address

      data: data,//接收地址在这里
      // name: 'link'//这么加也不行 
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
