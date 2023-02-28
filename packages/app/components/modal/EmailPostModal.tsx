// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { setClose, useAppThunkDispatch } from '@choko-wallet/app-redux';

import Modal from '../Modal';

const EmailPostModal = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const [emailInput, setEmailInput] = useState<string>('');

  const join = async () => {
    // 发送post 关闭modal

    const notification = toast.loading('Sending Email...');

    if (!emailInput) {
      throw new Error('Please input your email');
    }

    try {
      const response = await fetch('http://localhost:5000', {
        body: JSON.stringify({
          email: emailInput
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      const data = await response.json();

      console.log('1', data);
      toast.success('Thanks for joining beta waitlist', {
        id: notification
      });
    } catch (err) {
      toast.error('Something went wrong', {
        id: notification
      });
    } finally {
      setEmailInput('');
      dispatch(setClose('landingEmailPost'));
    }
  };

  return (
    <Modal modalName='landingEmailPost'>
      <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-6'
        >
          <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Join beta waitlist</p>
          <div onClick={() => dispatch(setClose('landingEmailPost'))}>
            <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
          </div>
        </Dialog.Title>

        <div className='flex items-center py-2 rounded-full md:border-2 md:shadow-sm'>

          <input
            className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none '
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder={'Please input your email'}
            type='text'
            value={emailInput} />
        </div>

        {emailInput && (
          <div className='flex'>
            <button className='px-5 py-2 my-5 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md hover:shadow-xl active:scale-90 '
              onClick={join}>Join</button>
          </div>
        )}

      </Dialog.Panel>
    </Modal>
  );
};

export default EmailPostModal;
