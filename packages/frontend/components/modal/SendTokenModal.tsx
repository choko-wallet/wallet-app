// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import encodeAddr from '@choko-wallet/frontend/utils/encodeAddr';
import { ethEncodeTxToUrl } from '@choko-wallet/frontend/utils/ethSendTx';
import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, DocumentDuplicateIcon, DotsHorizontalIcon, PaperAirplaneIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { QrReader } from 'react-qr-reader';

import { selectCurrentNetwork, selectKnownNetworks, selectStatus } from '../../features/redux/selectors';
import { endLoading, setClose, startLoading, toggle } from '../../features/slices/status';
import { BalanceInfo } from '../../utils/types';
import Modal from '../Modal';
import DropdownForSend from './DropdownForSend';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { polkadotEncodeTxToUrl } from '@choko-wallet/frontend/utils/polkadotSendTx';

/**
 * Modal wrapper to send crypto to another account
 */
interface Props {
  balanceInfo: BalanceInfo;
}

const SendTokenModal = ({ balanceInfo }: Props): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  
  const [loading, setLaoding] = useState(true);

  const [addressToSend, setAddressToSend] = useState<string>('');
  const [cryptoAddress, setCryptoAddress] = useState<string>('native');

  // Value to be sent
  const [amount, setAmount] = useState<number>(0);
  const [amountInUsd, setAmountInUsd] = useState<number>(0);
  
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [sendTransactionLoading, setSendTransactionLoading] = useState<boolean>(false);

  const knownNetworks = useSelector(selectKnownNetworks);
  const currentNetwork = useSelector(selectCurrentNetwork);
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const currentAddress = encodeAddr(knownNetworks[currentNetwork], currentUserAccount);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  const sendTransaction = () => {//参数 cryptoToSend amount addressToSend 
    if (sendTransactionLoading) return;
    setSendTransactionLoading(true);

    // console.log('addressToSend', addressToSend)
    // console.log('cryptoToSend', cryptoToSend)
    // console.log('amount', amount)
    // console.log('knownNetworks[currentNetwork];', knownNetworks[currentNetwork])
    // console.log('Object.entries(cryptoToSend)[0][0]', Object.entries(cryptoToSend)[0][0])
    // console.log('Object.entries(cryptoToSend)[0][1]', Object.entries(cryptoToSend)[0][1])

    // no need to await
    void (async () => {
      dispatch(startLoading('Generating Payload ...'));

      const network = knownNetworks[currentNetwork];

      switch (network.networkType) {
        case 'polkadot': {
          const requestUrl = await polkadotEncodeTxToUrl(
            network, currentUserAccount,
            addressToSend, amount
          )

          console.log('requestUrl', requestUrl);
          dispatch(endLoading());
          break;
        }
        case 'ethereum': {
          const requestUrl = ethEncodeTxToUrl(
            network, currentUserAccount,
            cryptoAddress,
            addressToSend, amount, 10
          )

          console.log('requestUrl', requestUrl);
          dispatch(endLoading());
          break;
        }
      }
    })();

    dispatch(setClose('homeSend'))
    setSendTransactionLoading(false);
  }

  useEffect(() => {
    if(balanceInfo && balanceInfo['native'] !== undefined) {
      setLaoding(false);
    }
  }, [])

  if (loading) { return null; }
  return (
    <Modal modalName='homeSend'>
      <div className={theme}>
        <Dialog.Panel className='w-[360px] md:w-[500px]  transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
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
            <DropdownForSend
              balanceInfo={balanceInfo}
              cryptoAddress={cryptoAddress}
              setCryptoAddress={setCryptoAddress} />

            <p className=' text-gray-700 dark:text-white '>From</p>
            <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center dark:border-blue-300 border border-gray-300 rounded-lg '>
              {/* <p className='flex flex-grow dark:text-white font-poppins'>{currentUserAccount.address}</p> */}
              <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
                {currentAddress.substring(0, 7)}
                <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
                {currentAddress.substring(currentAddress.length - 7, currentAddress.length)}
              </p>

              <CopyToClipboard
                text={currentAddress}>
                <div onClick={handleCopy}>
                  {showCheck
                    ? <CheckIcon className='text-green-600 dark:text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />
                    : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />}

                </div>
              </CopyToClipboard>
            </div>

            <div className='relative '>

              <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>To</p>

              <textarea className='font-poppins input input-bordered input-info w-full pr-12'
                onChange={(e) => setAddressToSend(e.target.value)}
                placeholder='Destination Address'
                // type="textarea"
                rows={3}
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

            <div className='flex flex-col items-center justify-center mb-1'>
              <div className='relative w-full'>
                <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Amount</p>

                <input
                  className='font-poppins input input-bordered input-info w-full '
                  max='10000000'
                  min='0'
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                    // console.log('first', isNaN(parseFloat(e.target.value)))
                    if (isNaN(parseFloat(e.target.value))) {
                      setAmountInUsd(0.0);
                    } else {
                      setAmountInUsd(
                        parseFloat(
                          (
                            parseFloat(e.target.value) * balanceInfo[cryptoAddress].priceInUSD
                          ).toFixed(2)));
                    }
                  }}
                  placeholder='0.0'
                  type='number'
                  value={amount}
                />
                <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{balanceInfo[cryptoAddress].symbol}</p>
              </div>

              <p className='my-1 '>=</p>

              <div className='relative w-full'>
                <input
                  className='font-poppins  input input-bordered input-info w-full '
                  max='10000000'
                  min='0'
                  onChange={(e) => {
                    const inUsd = parseFloat(e.target.value)
                    setAmountInUsd(inUsd);
                    if (isNaN(inUsd)) { setAmountInUsd(0.0) } 
                    else if (balanceInfo[cryptoAddress].priceInUSD === 0) { setAmount(0.0) } 
                    else {
                      setAmount(
                        parseFloat( ( inUsd / balanceInfo[cryptoAddress].priceInUSD ).toFixed(8) )
                      )
                    }
                  }}
                  placeholder='0.0'
                  type='number'
                  value={amountInUsd} />
                <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
              </div>

            </div>
            <p className='font-poppins text-gray-700 dark:text-white text-sm'>{balanceInfo[cryptoAddress].name} price: {balanceInfo[cryptoAddress].priceInUSD}</p>

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
