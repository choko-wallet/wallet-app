// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import React, { useEffect } from 'react';

import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers, Wallet } from 'ethers';

import { encodeContractCall } from '@choko-wallet/abi';

import { AccountOption, UserAccount } from '@choko-wallet/core';
import { biconomyFixtures } from '@choko-wallet/account-abstraction/fixtures';
// import { encodeMulti } from 'ethers-multisend';

import { getSmartWalletAddress } from '@choko-wallet/account-abstraction';
import { callDataDeployWallet, callDataExecTransaction, callDataExecTransactionBatch } from '@choko-wallet/account-abstraction';
import { sendBiconomyTxPayload } from '@choko-wallet/account-abstraction';
import { getChainIdFromProvider, unlockedUserAccountToEthersJsWallet, fetchWalletNonce } from '@choko-wallet/account-abstraction';



const Test: NextPage = () => {
  const seed = 'humor cook snap sunny ticket distance leaf unusual join business obey below';

  const provider = new JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/e88spzSSK6EgsFEbn33-RugKRqzPiEFu');

  const userAccount = new UserAccount(new AccountOption({
    hasEncryptedPrivateKeyExported: false,
    localKeyEncryptionStrategy: 0,
  }));

  const test1 = async () => {

    userAccount.unlock(seed);
    await userAccount.init();

    const addressX = userAccount.getAddress('ethereum');
    console.log('userAccount.getAddress', addressX);//0xAA1658296e2b770fB793eb8B36E856c8210A566F

    const smartWalletAddress = await getSmartWalletAddress(
      provider, addressX, 0
    );

    console.log('smartWalletAddress is', smartWalletAddress);//0x635DA47d95a2Ac4F30d6619B42D587d41fca1368

    const callData = callDataDeployWallet(5, userAccount.getAddress('ethereum'), 0);

    console.log('smart wallet deployment calldata is', callData);
    // smart wallet deployment calldata is 0xe85c8642000000000000000000000000aa1658296e2b770fb793eb8b36e856c8210a566f000000000000000000000000119df1582e0dd7334595b8280180f336c959f3bb0000000000000000000000000bc0c08122947be919a02f9861d83060d34ea4780000000000000000000000000000000000000000000000000000000000000000

    const wallet = unlockedUserAccountToEthersJsWallet(userAccount, provider);
    const r = await wallet.sendTransaction({
      chainId: 80001,
      to: biconomyFixtures[80001].walletFactoryAddress,
      data: callData,
      gasLimit: 2000000,
    })
    console.log(r)//{type: 2, chainId: 80001, nonce: 57, maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber, …}



  }




  const test2 = async () => {

    userAccount.unlock(seed);
    await userAccount.init();

    const wallet = unlockedUserAccountToEthersJsWallet(userAccount, provider);
    const smartWalletAddress = await getSmartWalletAddress(provider, wallet.address, 0);
    console.log('1')// Deploy Counter Factual Wallet

    // 1. send some tokens to contractWallet  给合约转账 0x635DA47d95a2Ac4F30d6619B42D587d41fca1368
    const transfer = await wallet.sendTransaction({
      to: smartWalletAddress,
      value: ethers.utils.parseEther("0.00001")
    });

    await transfer.wait();
    console.log('2')

    const callData = callDataExecTransaction(
      provider, smartWalletAddress, userAccount,
      {
        to: '0xAA1658296e2b770fB793eb8B36E856c8210A566F',
        value: ethers.utils.parseEther('0.01'),
        data: '0x',
      },
      0
    )
    console.log('3')

    const res = await wallet.sendTransaction({
      to: smartWalletAddress,
      data: callData,
      value: 0,
      chainId: 80001,
      gasLimit: 5000000,
    });
    console.log('4')

    // await res.wait();// 这里报错 不需要可注释掉 
    console.log(res)
    // {type: 2, chainId: 80001, nonce: 71, maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber, …}



  }

  const test3 = async () => {

    userAccount.unlock(seed);
    await userAccount.init();
    console.log('1')

    const wallet = unlockedUserAccountToEthersJsWallet(userAccount, provider);
    const smartWalletAddress = await getSmartWalletAddress(provider, wallet.address, 0);
    console.log('2')

    const transfer = await wallet.sendTransaction({
      to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844', // DAI address
      value: 0,
      data: encodeContractCall(
        'erc20', 'transfer', [smartWalletAddress, (10 * Math.pow(10, 18)).toString()]
      )
    });
    console.log('3')

    await transfer.wait();
    console.log('4')

    const callData = callDataExecTransaction(
      provider,

      smartWalletAddress,

      userAccount,

      {
        to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844', // DAI
        value: 0,
        data: encodeContractCall(
          'erc20', 'transfer', [wallet.address, (9 * Math.pow(10, 18)).toString()]
        ),
      },
      0
    )
    console.log('5')

    const res = await wallet.sendTransaction({
      to: smartWalletAddress,
      data: callData,
      value: 0,
      chainId: 80001,
    });

    console.log(res)
    // {type: 2, chainId: 80001, nonce: 74, maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber, …}

  }

  const test4 = async () => {

    userAccount.unlock(seed);
    await userAccount.init();
    console.log('1')
    const wallet = unlockedUserAccountToEthersJsWallet(userAccount, provider);
    const smartWalletAddress = await getSmartWalletAddress(provider, wallet.address, 0);
    console.log('2')

    const callData = callDataExecTransaction(
      provider, smartWalletAddress, userAccount, {
      operation: 1, // Must include this!
      to: biconomyFixtures[5].multiSendAddress,
      value: '0x00',
      targetTxGas: 200000,
      data: callDataExecTransactionBatch([
        {
          to: wallet.address,
          value: ethers.utils.parseEther("0.001").toString(),
        },
        {
          to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
          value: ethers.utils.parseEther('0').toString(),
          data: encodeContractCall(
            'erc20', 'transfer', [smartWalletAddress, (1 * Math.pow(10, 18)).toString()]
          )
        },
        {
          to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
          data: encodeContractCall(
            'erc20', 'transfer', [smartWalletAddress, (2 * Math.pow(10, 18)).toString()]
          )
        },
        {
          to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
          data: encodeContractCall(
            'erc20', 'transfer', [smartWalletAddress, (3 * Math.pow(10, 18)).toString()]
          )
        }
      ]),
    }, 0
    );
    console.log('3')

    const res = await wallet.sendTransaction({
      to: smartWalletAddress,
      value: 0,
      gasLimit: 2000000,
      data: callData,
    });

    console.log(res)
    // {type: 2, chainId: 80001, nonce: 75, maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber, …}

  }


  const test5 = async () => {

    userAccount.unlock(seed);
    await userAccount.init();
    console.log('1')
    const gaslessTxId = await sendBiconomyTxPayload(
      provider,
      {
        to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844', // DAI
        data: encodeContractCall('erc20', 'transfer', ['0xAA1658296e2b770fB793eb8B36E856c8210A566F', 100000]),
        value: 0
      },

      userAccount, 0, 0
    );

    console.log(gaslessTxId)
    // 报错  'biconomy relayer throws error - AA:sendBiconomyTxPayload'
  }


  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>
      <div onClick={() => test1()}>
        test1
      </div>

      <div onClick={() => test2()}>
        test2
      </div>

      <div onClick={() => test3()}>
        test3
      </div>

      <div onClick={() => test4()}>
        test4
      </div>

      <div onClick={() => test5()}>
        test5
      </div>
    </div>
  );
};

export default Test;
