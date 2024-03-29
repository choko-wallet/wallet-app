// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';

import { setClose, useAppThunkDispatch } from '@choko-wallet/app-redux';

import googleSvg from '../../images/google.svg';
import Modal from '../Modal';

const LoginModal = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();

  const loginWithGoogle = async () => {
    await signIn('google');
  };

  return (
    <Modal modalName='landingLogin1'>
      <Dialog.Panel className='md:w-[400px] w-90 max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-3'
        >
          <p className=' text-black flex flex-grow font-poppins'> </p>
          <div onClick={() => dispatch(setClose('landingLogin1'))}>
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-6 pb-5 md:pb-10'>
          <p className=' text-black flex flex-grow font-roboto text-[20px] sm:text-[24px] font-semibold whitespace-nowrap pb-5'>
            <span className='text-black font-normal mr-2 whitespace-nowrap'>
              Connect to
            </span>
            <span className='underline decoration-orange-400 underline-offset-4 decoration-4 mr-2'>
              CHOKO
            </span>
          </p>

          <div className='flex space-x-2 items-center justify-center'>
            <div className='w-8 h-2 bg-gray-700 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
          </div>

          <button
            className='flex items-center justify-center text-[15px] md:text-[18px] text-black rounded-md hover:shadow-sm p-2 md:p-2 w-full border border-gray-300 bg-transparent font-inter hover:ring-[#0170BF] hover:ring-2 transition duration-150 active:scale-95 ease-in-out'
            onClick={loginWithGoogle}
          >
            Continue with
            <img
              // loading='lazy'
              className='w-6 h-6 ml-3'
              /* eslint-disable */
              // @ts-ignore
              src={googleSvg.src}
              /* eslint-enable */
              // src='https://authjs.dev/img/providers/google.svg'
            />
          </button>

          <div className='flex w-full '>
            <p className=' text-[#747474] flex font-roboto text-[10px] '>
              Don’t have an account?
            </p>
            <p className='text-[#0170BF] ml-1 flex font-roboto text-[10px] md:flex-1'>
              We’ve got you covered.
            </p>
          </div>

          <div className='flex items-center justify-center w-full md:my-2'>
            <div className='w-full h-[1px] bg-gray-300'></div>
            <p className='p-2 text-gray-300'>OR</p>
            <div className='w-full h-[1px] bg-gray-300'></div>
          </div>

          <p className=' text-[#747474] flex flex-grow font-roboto text-center text-[12px]'>
            If you are aboslutely sure what you are doing with a crypto wallet
          </p>

          <button
            className=' text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-2 md:p-2 w-full bg-blue-400 focus:bg-[#0170BF] font-inter'
            onClick={() => router.push('/account')}
          >
            Create a Seed Phrase
          </button>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal;
