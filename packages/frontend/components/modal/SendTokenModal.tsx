// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import encodeAddr from '@choko-wallet/frontend/utils/encodeAddr';
import { ethSendTx } from '@choko-wallet/frontend/utils/ethSendTx';
import { toastFail } from '@choko-wallet/frontend/utils/toast';
import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, DocumentDuplicateIcon, PaperAirplaneIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { QrReader } from 'react-qr-reader';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { AccountOption, DappDescriptor, UserAccount } from '@choko-wallet/core';

import { selectCurrentNetwork, selectKnownNetworks, selectLoading, selectStatus } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { endLoading, setClose, setOpen, startLoading, toggle } from '../../features/slices/status';
import { BalanceInfo, CryptoBalance } from '../../utils/types';
import Modal from '../Modal';
import DropdownForSend from './DropdownForSend';
import { useDispatch, useSelector } from 'react-redux';

import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { selectCurrentUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, switchUserAccount } from '@choko-wallet/frontend/features/slices/user';
import { SignTxDescriptor, SignTxRequest, SignTxRequestPayload } from '@choko-wallet/request-handler';
import { ethers } from 'ethers';
import { xxHash } from '@choko-wallet/core/util';
import Keyring from '@polkadot/keyring';
import { encodeContractCall } from '@choko-wallet/abi';


/**
 * Modal wrapper to send crypto to another account
 * NOT FUNCTIONAL YET.
 */
interface Props {
  balanceInfo: BalanceInfo;
}

const LinkTokenABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';

const SendTokenModal = ({ balanceInfo }: Props): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useAppThunkDispatch();
  const [addressToSend, setAddressToSend] = useState<string>('');
  const [cryptoToSend, setCryptoToSend] = useState<CryptoBalance | null>(null);
  const status = useSelector(selectStatus);
  const [amount, setAmount] = useState<number>(0);
  const [amountToCurrency, setAmountToCurrency] = useState<number>(0);
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [sendTransactionLoading, setSendTransactionLoading] = useState<boolean>(false);
  const knownNetworks = useSelector(selectKnownNetworks);
  const currentNetwork = useSelector(selectCurrentNetwork);
  const reduxLoadingState = useSelector(selectLoading);

  // const privateKey = '6e00e2fb6feb95393f29e0ceeabebc4f7b2d692b4912663546755b9b8f87b938';
  const privateKey = '72c7ed523e0084a99d2419a30332dc0d83d6d61f4d4a6b3dc3a38f7cb3588d80';//0.5goerli 22link
  const seed = 'humor cook snap sunny ticket distance leaf unusual join business obey below';//0.5goerli 22link

  // const seed = 'acoustic hover lyrics object execute unfold father give wing hen remain ship';

  const contractAddress = '0x238F47e33cD44A7701F2Bb824659D432efD17b41';
  const currentUserAccount = useSelector(selectCurrentUserAccount);


  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  const sendTransaction = () => {//参数 cryptoToSend amount addressToSend 
    if (sendTransactionLoading) return;
    setSendTransactionLoading(true);

    // no need to await
    void (async () => {
      // dispatch(startLoading('Send Transaction ...'));

      const network = knownNetworks[currentNetwork];

      switch (network.networkType) {
        case 'polkadot':
          console.log('polkadot')
          break;
        case 'ethereum':
          try {

            const dapp = new DappDescriptor({
              activeNetwork: knownNetworks[u8aToHex(xxHash('goerli'))],
              displayName: 'Jest Testing',
              infoName: 'Test',
              version: 0
            });

            let account = currentUserAccount;
            const mnemonicWallet = ethers.Wallet.fromMnemonic(seed);//用seed生成的 实际上用户账户已经生成了？
            console.log('1');

            // expect((mnemonicWallet.privateKey).slice(2)).toEqual(privateKey);
            account.unlock(hexToU8a((mnemonicWallet.privateKey).slice(2)));
            await account.init();
            account.lock();

            /* 
            ** sending eth data
            */
            // const tx = {
            //   chainId: 5,
            //   to: '0xE8DAC12f7A4b0a47e8e2Af2b96db6F54e2E2C9C3',
            //   value: ethers.utils.parseEther('0.0001'),
            // };

            /* 
            ** erc20 token balance checking data
            */
            const data1 = encodeContractCall(
              'erc20', 
              'balanceOf', 
              ['0xAA1658296e2b770fB793eb8B36E856c8210A566F']
            )

            /* 
            ** approve max balance erc20 token data
            */
            const data2 = encodeContractCall(
              '', 
              'approve', 
              [
                '0x11760b4950F9981770049B3cC0D83CC8BC133247',
                 ethers.constants.MaxUint256
              ],
              LinkTokenABI
            )

            /* 
            ** sending erc20 link token data through abi
            */
            const data = encodeContractCall(
              '', 
              'transfer', 
              [
                '0x11760b4950F9981770049B3cC0D83CC8BC133247',
                '1000000000000000000'  // send 1 Link token
              ],
              LinkTokenABI
            )
            console.log("data: ", data);

            const tx = {
              chainId: 5,
              data: data,
              to: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB' // goerli link token contract address
            }
            console.log('2');

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

            window.location.href = redirectUrl

            // setBalanceInfo(res);
            dispatch(endLoading());
            // toastSuccess(`Changed to ${network.text}`);
          } catch (e) {
            console.error(e);
            dispatch(endLoading());
            toastFail('Someting Wrong! Please Switch To Other Network.');
          }
          console.log('eth')

          break;
      }
    })();

    dispatch(setClose('homeSend'))//别忘了这个 
    setSendTransactionLoading(false);

  }

  return (
    <Modal modalName='homeSend'>
      <div className={theme}>
        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
          <Dialog.Title
            as='h3'
            className='text-lg  font-medium leading-6 flex items-center mb-6 '
          >
            <div className='flex items-center  flex-grow'>
              <PaperAirplaneIcon className='rotate-45 text-gray-700 h-8 w-8 dark:text-[#03F3FF]' />
              {theme === 'dark'
                ? <p className=' text-gradient font-poppins'>Send Crypto</p>
                : <p className=' text-gray-700 font-poppins'>Send Crypto</p>
              }
            </div>
            <div onClick={() => dispatch(setClose('homeSend'))}>
              <XIcon className='  h-8 w-8 cursor-pointer text-black dark:text-white' />
            </div>
          </Dialog.Title>
          <div className='mt-2 '>
            <b>unimplemented!()</b>
            <DropdownForSend
              balanceInfo={balanceInfo}
              cryptoToSend={cryptoToSend}
              setCryptoToSend={setCryptoToSend} />

            <p className=' text-gray-700 dark:text-white '>From</p>
            <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center dark:border-blue-300 border border-gray-300 rounded-lg '>
              <p className='flex flex-grow dark:text-white font-poppins'>5G16tBnZEmtnL6A5nxZJpJtUw</p>

              <CopyToClipboard
                text={'5G16tBnZEmtnL6A5nxZJpJtUw'}>
                <div onClick={handleCopy}>
                  {showCheck
                    ? <CheckIcon className='text-green-600 dark:text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />
                    : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />}

                </div>
              </CopyToClipboard>
            </div>

            <div className='relative'>

              <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>To</p>

              <input className='font-poppins input input-bordered input-info w-full '
                onChange={(e) => setAddressToSend(e.target.value)}
                placeholder='Destination Address'
                type='text'
                value={addressToSend} />
              <CameraIcon
                className='absolute top-9 right-2 text-gray-600 ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full dark:text-[#03F3FF]'
                onClick={() => dispatch(toggle('homeQRScanner'))}
              />

            </div>

            {status.homeQRScanner &&
              <div>
                <QrReader
                  className='absolute top-0 right-5 left-5 bottom-0 z-40'
                  constraints={{ facingMode: 'user' }}
                  onResult={(result, error) => {
                    if (result) {
                      // setAddressToSend(result?.text)
                      dispatch(setClose('homeQRScanner'));
                    }

                    if (error) {
                      console.info(error);
                    }
                  }}
                />
                <div className='absolute top-16 right-10 z-50 rounded-full p-2 bg-red-100'>
                  <XIcon className='h-5 w-5'
                    onClick={() => dispatch(setClose('homeQRScanner'))} />
                </div>

              </div>}

            <div className='flex items-end mb-1'>
              <div className='relative grow'>
                <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Amount</p>

                <input
                  className='font-poppins input input-bordered input-info w-full '
                  max='10000000'
                  min='0'
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                    setAmountToCurrency(
                      parseFloat((parseFloat(e.target.value) * cryptoToSend.priceInUSD).toFixed(2)));
                  }}
                  placeholder='0.0'
                  type='number'
                  value={amountToCurrency ? amount : 0}
                />
                <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{cryptoToSend?.symbol}</p>
              </div>

              <p className='mx-1 pb-3'>=</p>

              <div className='relative grow'>
                <input
                  className='font-poppins  input input-bordered input-info w-full '
                  max='10000000'
                  min='0'
                  onChange={(e) => {
                    setAmountToCurrency(parseFloat(e.target.value));
                    setAmount(
                      parseFloat((parseFloat(e.target.value) / cryptoToSend?.priceInUSD).toFixed(8)));
                  }}
                  placeholder='0.0'
                  type='number'
                  value={amount ? amountToCurrency : 0} />
                <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
              </div>

            </div>
            <p className='font-poppins text-gray-700 dark:text-white text-sm'>{cryptoToSend?.name} price: {cryptoToSend?.priceInUSD}</p>

            {/* <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee {' '} {cryptoToSend.networkFee}</p> */}

            {/* <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p> */}

          </div>

          <div className='mt-4 bg-transparent rounded-lg'>
            {!sendTransactionLoading ?
              <button
                className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                onClick={() => sendTransaction()}

                type='button'
              >
                Send
              </button>

              :
              (
                <img
                  alt=''
                  className='object-cover w-full h-20'
                  src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
                />
              )
            }

          </div>
        </Dialog.Panel>
      </div>
    </Modal>
  );
};

export default SendTokenModal;
