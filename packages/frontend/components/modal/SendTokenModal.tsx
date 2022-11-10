// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, DocumentDuplicateIcon, PaperAirplaneIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { QrReader } from 'react-qr-reader';
import { useSelector } from 'react-redux';

import { selectStatus } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { setClose, toggle } from '../../features/slices/status';
import { BalanceInfo, CryptoBalance } from '../../utils/types';
import Modal from '../Modal';
import DropdownForSend from './DropdownForSend';

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
  const [cryptoToSend, setCryptoToSend] = useState<CryptoBalance | null>(null);
  const status = useSelector(selectStatus);
  const [amount, setAmount] = useState<number>(0);
  const [amountToCurrency, setAmountToCurrency] = useState<number>(0);
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

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
                  value={amountToCurrency ? amount : null}
                // value={amount}
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
                  value={amount ? amountToCurrency : null} />
                <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
              </div>

            </div>
            <p className='font-poppins text-gray-700 dark:text-white text-sm'>{cryptoToSend?.name} price: {cryptoToSend?.priceInUSD}</p>

            {/* <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee {' '} {cryptoToSend.networkFee}</p> */}

            {/* <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p> */}

          </div>

          <div className='mt-4'>

            <button
              className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={() => dispatch(setClose('homeSend'))}

              type='button'
            >
              Send
            </button>

          </div>
        </Dialog.Panel>
      </div>
    </Modal>
  );
};

export default SendTokenModal;
