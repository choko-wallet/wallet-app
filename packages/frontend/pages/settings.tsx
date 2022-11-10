// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, DocumentDuplicateIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import ExportAccountModal from '../components/modal/ExportAccountModal';
import { selectCurrentUserAccount } from '../features/redux/selectors';
import { loadAllNetworks } from '../features/slices/network';
import { setOpen } from '../features/slices/status';
import { loadUserAccount } from '../features/slices/user';

/**
 * Setting page. WIP.
 */

/* eslint-disable sort-keys */
function Settings (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUserAccount = useSelector(selectCurrentUserAccount);

  const { theme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  const [showCheck, setShowCheck] = useState<boolean>(false);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
      dispatch(loadAllNetworks());
    }
  }, [dispatch, router]);

  useEffect(() => {
    setMounted(true);
  }, [currentUserAccount]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme}>
      <Header />
      <div className='dark'>
        <div className='bg-gray-100  dark:bg-primary min-h-screen overflow-hidden'>
          {/* <Toaster /> */}

          {/* settings */}
          <div className='p-3'>
            <div className='dark:border-[#00f6ff] dark:border max-w-3xl mx-auto p-5 relative flex flex-col dark:bg-gradient-to-br from-gray-900 to-black flex-grow m-5 rounded-xl '>
              <div className='p-5 '>
                <p className='text-2xl text-gray-700 dark:text-white font-poppins'> Settings </p>

              </div>

              <div className='flex justify-between m-1'>
                <div className='my-auto'>
                  <p className='text-lg dark:text-[#03F3FF]'>Your Address</p>

                </div>

                <div className='h-12 my-auto'>
                  <div className='cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm'>

                    <p className='font-poppins whitespace-nowrap flex md:hidden text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                      {/* {currentAccount} */}
                      {currentUserAccount?.address.substring(0, 6)}
                      <DotsHorizontalIcon className='h-6 w-6 dark:text-[#03F3FF] mx-1' />
                      {currentUserAccount?.address.substring(currentUserAccount?.address.length - 6, currentUserAccount?.address.length)}
                    </p>

                    <p className='font-poppins whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                      {currentUserAccount?.address}

                    </p>

                    <CopyToClipboard
                      text={currentUserAccount?.address}>
                      <div onClick={handleCopy}>
                        {showCheck
                          ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                          : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                      </div>
                    </CopyToClipboard>

                  </div>

                </div>
              </div>

              {/* <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>View Your Mnemonic</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Do not share your private keys with anyone.</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    // onClick={xxx}

                  >
                    Mnemonic
                  </button>
                </div>
              </div> */}

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>(WIP) Change Password</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Password is the one you set when creating the account.</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    // onClick={closeModal2}

                  >
                    Password
                  </button>
                </div>
              </div>

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>Export Account Url</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Generate Account Url For Import.</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    onClick={() => dispatch(setOpen('settingsExportUrl'))} >
                    Account Url
                  </button>
                </div>
              </div>

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>(WIP)Select Language</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Set your preferred language</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'>
                    Language
                  </button>
                </div>
              </div>

              <div className='flex justify-between m-1 '>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>(WIP) Trading Currency</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Select your trading currency</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    // onClick={closeModal2}

                  >
                    Currency
                  </button>
                </div>
              </div>

            </div >
          </div>

          <ExportAccountModal />
        </div>
      </div>

    </div >

  );
}

export default Settings;
