// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/outline';
import { u8aToHex } from '@skyekiwi/util';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '@choko-wallet/app-common';
import { selectCurrentUserAccount, setClose } from '@choko-wallet/app-redux';
import { walletUrl } from '@choko-wallet/app-utils';

import Modal from '../Modal';

/**
 * Modal wrapper to generate an exportAccount in Setting
 */
const ExportAccountModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUserAccount = useSelector(selectCurrentUserAccount);

  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [exportUrl, setExportUrl] = useState<string>('');

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  useEffect(() => {
    if (currentUserAccount) {
      setExportUrl(`${walletUrl}/import?payload=${u8aToHex(currentUserAccount?.serializeWithEncryptedKey())}`);
    }
  }, [currentUserAccount]);

  return (
    <Modal modalName='settingsExportUrl'>
      <Dialog.Panel className='border border-[#00f6ff] w-full max-w-md transform overflow-hidden rounded-2xl bg-black dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all'>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 text-gradient '
        >
          Account Url
        </Dialog.Title>

        <div>
          <div className='w-full stringWrap mt-3 text-gray-300'>{exportUrl}</div>
          <div className='w-full flex items-center justify-center m-1'>
            <CopyToClipboard
              text={exportUrl}>
              <div onClick={handleCopy}>
                {showCheck
                  ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                  : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

              </div>
            </CopyToClipboard>
          </div>
          <div className='relative h-64 w-64 mx-auto m-3 '>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={exportUrl} />
          </div>
        </div>

        <div>
          <div className='mt-4 flex justify-between'>
            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={() => dispatch(setClose('settingsExportUrl'))}
              type='button'
            >
              Close
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default ExportAccountModal;
