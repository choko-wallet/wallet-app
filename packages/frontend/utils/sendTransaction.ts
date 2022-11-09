// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

export {};
// import { Alchemy, Utils, Wallet } from 'alchemy-sdk';
// import { ethers } from 'ethers';

// import alchemyAll from './alchemy';
// import { CryptoForBalance } from './types';

// // 0xBF544eBd099Fa1797Ed06aD4665646c1995629EE
// export const getEthGoerliBalance = async (address: string): Promise<number> => {
//   const alchemy: Alchemy = alchemyAll.ethGoerli;
//   const ethBalance = await alchemy.core.getBalance(address);
//   const ethBalanceFormat = Number(ethers.utils.formatEther(ethBalance._hex));

//   return ethBalanceFormat;
// };

// // 有点蒙了 回头再弄下
// export const getEthGoerliErc20Balance = async (address: string, contractAddress: string): Promise<number> => {
//   const alchemy: Alchemy = alchemyAll.ethGoerli;

//   const balances = await alchemy.core.getTokenBalances(address);

//   console.log('balances', balances);
//   // const metadata = await alchemy.core.getTokenMetadata(balances);

//   // return ethBalanceFormat
// };

// export const sendTransactionEthGoerliNativeToken = async (addressToSend: string, amount: number): Promise<T> => { // 需要提前fetch费用 给提示
//   // alchemy
//   const alchemy: Alchemy = alchemyAll.ethGoerli;

//   // 用私钥发送  需要跳转输入密码获取私钥
//   const wallet = new Wallet(process.env.NEXT_PUBLIC_ETH_GOERLI_PRIVATE_KEY);

//   const transaction = {
//     to: addressToSend, // 接收地址
//     value: Utils.parseEther(amount.toString()), // 0.001测试就行 账户余额0.13ETH 25LINK
//     gasLimit: '90000', // fee 不够会报错 需要调高
//     maxPriorityFeePerGas: Utils.parseUnits('60', 'gwei'), // fee 不够会报错 需要调高
//     maxFeePerGas: Utils.parseUnits('120', 'gwei'), // fee 不够会报错 需要调高
//     nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
//     type: 2,
//     chainId: 5 // Corresponds to ETH_GOERLI
//   };

//   const rawTransaction = await wallet.signTransaction(transaction);

//   console.log('rawTransaction', rawTransaction);
//   const transactionResponse = await alchemy.transact.sendTransaction(rawTransaction);

//   console.log('transactionResponse', transactionResponse);

//   // alchemy.transact.getTransaction(transactionResponse.hash)
//   //   .then((res) => console.log(res));

//   return transactionResponse;
// };

// export const sendTransactionEthGoerliErc20Token = async (cryptoToSend: CryptoForBalance, addressToSend: string, amount: number): Promise<T> => {
//   const alchemy: Alchemy = alchemyAll.alchemyEthGoerli;

//   // 通过ethers 的合约abi 发送合约币
//   const alchemyProvider = new ethers.providers.AlchemyProvider('goerli', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETH_GOERLI);

//   const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_ETH_GOERLI_PRIVATE_KEY, alchemyProvider);

//   const Abi = [// 不同的币可能不一样 需要通过合约地址 找abi 或者确定支持的币 定好abi
//     // Some details about the token
//     'function name() view returns (string)',
//     'function symbol() view returns (string)',

//     // Get the account balance
//     'function balanceOf(address) view returns (uint)',

//     // Send some of your tokens to someone else
//     'function transfer(address to, uint amount)',

//     // An event triggered whenever anyone transfers to someone else
//     'event Transfer(address indexed from, address indexed to, uint amount)'
//   ];
//   // console.log('cryptoToSend', cryptoToSend)
//   const erc20TokenContract = new ethers.Contract(cryptoToSend.contractAddress, Abi, signer);

//   // await erc20TokenContract.name()
//   // await erc20TokenContract.symbol()

//   const balance = await erc20TokenContract.balanceOf('0xBF544eBd099Fa1797Ed06aD4665646c1995629EE');

//   const balanceFormat = ethers.utils.formatUnits(balance, 18);

//   console.log('balanceFormat', balanceFormat);

//   const TokenWithSigner = erc20TokenContract.connect(signer);
//   const erc20token = ethers.utils.parseUnits(amount.toString(), 18);// 不同的币不一样
//   const tx = TokenWithSigner.transfer(addressToSend, erc20token);

//   return tx;
// };
// // 需要的话 找commit的erc20 token transfer  home发送函数和modal
