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
      <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-6'
        >
          <p className=' text-black flex flex-grow font-poppins'> </p>
          <div onClick={() => dispatch(setClose('landingLogin'))}>
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <div className='flex flex-col items-center justify-center -mt-5 space-y-4 md:px-10 pb-5 md:pb-10'>
          <p className=' text-black flex flex-grow font-roboto text-[18px] sm:text-[24px] font-semibold pb-5'>CHOKO WALLET</p>

          <button className=' text-[10px] md:text-[16px] text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter'
          // onClick={() => router.push('/home')}
          >Continue with Google
          </button>
          <button className=' text-[10px] md:text-[16px] text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter'
          // onClick={() => router.push('/home')}
          >Continue with Github
          </button>

          <div className='flex w-full '>
            <p className=' text-[#747474] flex font-roboto text-[10px] '>
              Don’t have an account?
            </p>
            <p className='text-[#0170BF] ml-1 flex font-roboto text-[10px] md:flex-1'>We’ve got you covered.</p>
          </div>

          <div className='flex items-center justify-center w-full md:my-2'>
            <div className='w-full h-[1px] bg-gray-300'></div>
            <p className='p-2 text-gray-300'>OR</p>
            <div className='w-full h-[1px] bg-gray-300'></div>
          </div>

          <p className=' text-[#747474] flex flex-grow font-roboto text-[10px]'>
            Create a Choko Wallet account to continue
          </p>


          <button className=' text-[10px] md:text-[16px] text-white transition duration-150 rounded-sm hover:shadow-sm active:scale-90 p-1 md:p-2 w-full bg-[#0170BF] font-inter'
          // onClick={() => router.push('/home')}
          >
            Create an account
          </button>


        </div>

      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal;