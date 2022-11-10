// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React from 'react';

import { useAppThunkDispatch } from '../../features/redux/store';
import { setClose } from '../../features/slices/status';
import Modal from '../Modal';
import AddTokenBox from './AddTokenBox';

const AddTokenModal = (): JSX.Element => {
  const { theme } = useTheme();
  const dispatch = useAppThunkDispatch();

  return (
    <Modal modalName='homeAddToken'>
      <div className={theme}>
        <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 flex items-center mb-6'
          >
            <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Add ERC20 Token</p>
            <div onClick={() => dispatch(setClose('homeAddToken'))}>
              <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
            </div>
          </Dialog.Title>

          <AddTokenBox />

        </Dialog.Panel>
      </div >
    </Modal>
  );
};

export default AddTokenModal;
