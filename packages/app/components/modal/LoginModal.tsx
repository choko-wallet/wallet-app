// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { setClose, useAppThunkDispatch } from '@choko-wallet/app-redux';

import Modal from '../Modal';

const LoginModal = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  // const [emailInput, setEmailInput] = useState<string>('');

  // const join = async () => {

  //   const notification = toast.loading('Sending Email...');

  //   if (!emailInput) {
  //     throw new Error('Please input your email');
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000', {
  //       body: JSON.stringify({
  //         email: emailInput
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'POST'
  //     });

  //     const data = await response.json();

  //     console.log('1', data);
  //     toast.success('Thanks for joining beta waitlist', {
  //       id: notification
  //     });
  //   } catch (err) {
  //     toast.error('Something went wrong', {
  //       id: notification
  //     });
  //   } finally {
  //     setEmailInput('');
  //     dispatch(setClose('landingEmailPost'));
  //   }
  // };

  return (
    <Modal modalName='landingLogin'>
      <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-6'
        >
          <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Join beta waitlist</p>
          <div onClick={() => dispatch(setClose('landingLogin'))}>
            <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
          </div>
        </Dialog.Title>



      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal;
