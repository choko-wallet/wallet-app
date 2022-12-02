// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckIcon, DocumentDuplicateIcon, DownloadIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import encodeAddr from '@choko-wallet/frontend/utils/aaUtils';

import { useAppThunkDispatch } from '../../features/redux/store';
import { setClose } from '../../features/slices/status';
import Modal from '../Modal';
import { useSelector } from 'react-redux';
import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks } from '@choko-wallet/frontend/features/redux/selectors';

/**
 * The dropdown to receive crypto and display a QR code
 * unimplemented!() for security reason.
 * Mostly likely nobody is gonna actually use this yet.
 * We do not want our users to use the wallet for real assets yet.
 */

const ReceiveTokenModal = (): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useAppThunkDispatch();
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const currentAddress = encodeAddr(knownNetworks[currentNetwork], currentUserAccount);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <Modal modalName='homeReceive'>
      <div className={theme}>
        <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 flex items-center mb-6'
          >

            <DownloadIcon className=' text-gray-700 h-8 w-8 dark:text-[#03F3FF] ' />
            {theme === 'dark' ? <p className=' text-gradient flex flex-grow font-poppins'>Receive Crypto</p> : <p className=' text-gray-700 flex flex-grow font-poppins'>Receive Crypto</p>}

            <div onClick={() => dispatch(setClose('homeReceive'))}>
              <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
            </div>

          </Dialog.Title>
          <div className='mt-2 '>
            {/* <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Network <b>unimplemented!()</b></p> */}

            <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Address</p>

            <p className='p-2 border border-blue-300 rounded-md font-poppins text-gray-800 dark:text-white stringWrap text-center items-center justify-certer flex-grow  ml-2 '>
              {currentAddress}
            </p>

            <div className=' items-center flex justify-center p-2'>

              <CopyToClipboard
                text={currentAddress}>
                <div onClick={handleCopy}>
                  {showCheck
                    ? <CheckIcon className='text-green-600 dark:text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />
                    : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />}

                </div>
              </CopyToClipboard>
            </div>

            <div className='relative h-64 w-64 mx-auto m-3 '>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={currentAddress} />
            </div>

            {/* <p className='dark:text-white text-gray-700 text-sm pt-3 font-poppins'>Send only {cryptoToReceive.name} to this deposit address.</p> */}
            <p className='dark:text-white text-gray-700 text-sm font-poppins'>Ensure the network is {' '}
              <span className='text-red-400'>{knownNetworks[currentNetwork].info}</span>
            </p>

          </div>

        </Dialog.Panel>
      </div>
    </Modal>
  );
};

export default ReceiveTokenModal;
