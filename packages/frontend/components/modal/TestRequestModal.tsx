// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckIcon, DocumentDuplicateIcon, DownloadIcon, XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';

import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks } from '@choko-wallet/frontend/features/redux/selectors';
import encodeAddr from '@choko-wallet/frontend/utils/aaUtils';

import { useAppThunkDispatch } from '../../features/redux/store';
import { setClose } from '../../features/slices/status';
import Modal from '../Modal';

/**
 * The dropdown to receive crypto and display a QR code
 * unimplemented!() for security reason.
 * Mostly likely nobody is gonna actually use this yet.
 * We do not want our users to use the wallet for real assets yet.
 */
interface Props {
  modalString: string;
}


const TestRequestModal = ({ modalString }: Props): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useAppThunkDispatch();
  const [showCheck, setShowCheck] = useState<boolean>(false);

  // const currentNetwork = useSelector(selectCurrentNetwork);
  // const knownNetworks = useSelector(selectKnownNetworks);
  // const currentUserAccount = useSelector(selectCurrentUserAccount);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <Modal modalName='testRequest'>
      <div className={theme}>
        <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>

          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 flex items-center mb-6'
          >

            <p className=' text-gray-700 flex flex-grow font-poppins'>Response</p>

            <div onClick={() => dispatch(setClose('testRequest'))}>
              <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
            </div>

          </Dialog.Title>

          <div className='mt-2 '>

            <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins stringWrap'>{modalString}</p>

          </div>

        </Dialog.Panel>
      </div>
    </Modal>
  );
};

export default TestRequestModal;
