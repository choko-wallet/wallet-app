// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import encodeAddr from '@choko-wallet/frontend/utils/encodeAddr';
import { ethEncodeTxToUrl } from '@choko-wallet/frontend/utils/ethSendTx';
import { toastFail } from '@choko-wallet/frontend/utils/toast';
import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, DocumentDuplicateIcon, DotsHorizontalIcon, PaperAirplaneIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { QrReader } from 'react-qr-reader';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { AccountOption, DappDescriptor, UserAccount } from '@choko-wallet/core';

import { selectCurrentNetwork, selectKnownNetworks, selectLoading, selectStatus } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { endLoading, setClose, setOpen, startLoading, toggle } from '../../features/slices/status';
import { BalanceInfo, CryptoBalance, CryptoBalanceWithAddress } from '../../utils/types';
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

const SendTokenModal = ({ balanceInfo }: Props): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useAppThunkDispatch();
  const [addressToSend, setAddressToSend] = useState<string>('');
  const [cryptoToSend, setCryptoToSend] = useState<CryptoBalanceWithAddress>({ 'native': balanceInfo.native });
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
  const currentAddress = encodeAddr(knownNetworks[currentNetwork], currentUserAccount);

  console.log('balanceInfo', balanceInfo)
  console.log('cryptoToSend', cryptoToSend)

  console.log('Object.entries(cryptoToSend)[0][1].priceInUSD', Object.entries(cryptoToSend)[0][1]?.priceInUSD)

  // console.log('currentUserAccount', currentUserAccount)


  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  const sendTransaction = () => {//参数 cryptoToSend amount addressToSend 
    if (sendTransactionLoading) return;
    setSendTransactionLoading(true);

    console.log('addressToSend', addressToSend)
    console.log('cryptoToSend', cryptoToSend)
    console.log('amount', amount)
    console.log('knownNetworks[currentNetwork];', knownNetworks[currentNetwork])
    // console.log('ethers.utils.parseEther', ethers.utils.parseEther('0.1'))

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
            const redirectUrl = await ethEncodeTxToUrl(network, Object.entries(cryptoToSend)[0][0], Object.entries(cryptoToSend)[0][1], amount, addressToSend);
            window.location.href = redirectUrl;
            dispatch(endLoading());
          } catch (e) {
            console.error(e);
            // dispatch(endLoading());
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
              {/* <p className='flex flex-grow dark:text-white font-poppins'>{currentUserAccount.address}</p> */}
              <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
                {currentAddress.substring(0, 7)}
                <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
                {currentAddress.substring(currentAddress.length - 7, currentAddress.length)}
              </p>



              <CopyToClipboard
                text={currentUserAccount.address}>
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
                    console.log('first', isNaN(parseFloat(e.target.value)))
                    if (isNaN(parseFloat(e.target.value))) {
                      setAmountToCurrency(0);
                    } else {
                      setAmountToCurrency(
                        parseFloat(
                          (parseFloat(e.target.value) * Object.entries(cryptoToSend)[0][1]?.priceInUSD).toFixed(2)));
                    }
                  }}
                  placeholder='0.0'
                  type='number'
                  value={amount}
                />
                <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{Object.entries(cryptoToSend)[0][1]?.symbol}</p>
              </div>

              <p className='mx-1 pb-3'>=</p>

              <div className='relative grow'>
                <input
                  className='font-poppins  input input-bordered input-info w-full '
                  max='10000000'
                  min='0'
                  onChange={(e) => {
                    setAmountToCurrency(parseFloat(e.target.value));
                    if (Object.entries(cryptoToSend)[0][1]?.priceInUSD === 0) {
                      setAmount(0);
                    } else {
                      if (isNaN(parseFloat(e.target.value))) {
                        setAmount(0);
                      } else {
                        setAmount(
                          parseFloat((parseFloat(e.target.value) / Object.entries(cryptoToSend)[0][1]?.priceInUSD).toFixed(8)));
                      }
                    }

                  }}
                  placeholder='0.0'
                  type='number'
                  value={amountToCurrency} />
                <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
              </div>

            </div>
            <p className='font-poppins text-gray-700 dark:text-white text-sm'>{Object.entries(cryptoToSend)[0][1]?.name} price: {Object.entries(cryptoToSend)[0][1]?.priceInUSD}</p>

            {/* <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee {' '} {cryptoToSend.networkFee}</p> */}

            {/* <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p> */}

          </div>

          <div className='mt-4 bg-transparent rounded-lg'>
            {!sendTransactionLoading ?
              <button
                className={`font-poppins py-3 px-6 font-medium text-[18px]  rounded-[10px] outline-none' ${amount && amount !== 0 && addressToSend !== '' ? 'text-primary bg-blue-gradient' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
                onClick={() => sendTransaction()}
                disabled={amount === 0 || amount === null || addressToSend === ''}
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
