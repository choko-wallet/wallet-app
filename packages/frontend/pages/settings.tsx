// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon, DocumentDuplicateIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from '../components/Dropdown';

// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';

/* eslint-disable sort-keys */
function Settings(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currencyArr, setCurrencyArr] = useState<string[]>(['USD', 'EUR']);
  const [currency, setCurrency] = useState<string>('USD');
  const [languageArr, setLanguageArr] = useState<string[]>(['ENG', '中文']);
  const [language, setLanguage] = useState<string>('ENG');
  const [isMnemonicOpen, setIsMnemonicOpen] = useState<boolean>(false);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);



  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
  }, [userAccount])

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }

  function closeMnemonic() {
    setIsMnemonicOpen(false)
    setShowMnemonic(false)
  }

  return (
    <div className='grid grid-cols-12 min-h-screen bg-gray-400'>

      <div className='col-span-12 '>
        <div className='navbar bg-base-100'>

          <div className='navbar-start'>
            {/* TODO: fix the logo */}
            <a className='btn btn-ghost normal-case text-xl'
              onClick={() => router.push('/')}>
              Choko
              {/* <Image
                  className='relative w-10 m-0'
                  // layout='fill'
                  objectFit='fill'
                  src={logo}
                /> */}
            </a>
          </div>

          <div className='navbar-center'></div>

          <div className='navbar-end'>
            <Popover className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                    ${open ? '' : 'text-opacity-90'} btn btn-ghost bg-stone-200 normal-case`}
                  >
                    <UserCircleIcon className='h-6 w-6 mr-5' />
                    <span className='hidden md:block'>{currentAccount.substring(0, 13)} ... {currentAccount.substring(currentAccount.length - 13, currentAccount.length)}</span>
                    <span className='block md:hidden'>{currentAccount.substring(0, 10)} ...</span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute z-10 w-full max-w-sm transform sm:px-0 lg:max-w-3xl'>
                      <div className='overflow-hidden rounded-lg shadow-lg'>
                        <div className='relative grid grid-cols-2 gap-4 bg-white py-5'>
                          {allAccounts.map((name, index) => (
                            <div
                              className='px-5 items-center col-span-2 rounded-lg py-2 transition duration-150 ease-in-out hover:bg-gray-50'
                              key={index}
                            >
                              <p className='text-sm font-medium text-gray-900 normal-case'> {name.substring(0, 13)} ... {name.substring(name.length - 13, name.length)}</p>
                            </div>
                          ))}
                        </div>
                        <div className='bg-gray-50 p-4'>
                          <div
                            className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100'
                            onClick={() => router.push('/account')}
                          >
                            <span className='flex items-center'>
                              <span className='text-sm font-medium text-gray-900'>
                                Add New Account
                              </span>
                            </span>
                            <span className='block text-sm text-gray-500'>
                              Create or Import new Account
                            </span>
                          </div>
                        </div>

                        <div className='bg-gray-200 p-4'>
                          <div
                            className='flow-root rounded-md px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-100'
                          >
                            <span className='flex items-center'>
                              <span className='text-sm font-medium text-gray-900'>
                                Remove Account
                              </span>
                            </span>
                            <span className='block text-sm text-gray-500'>
                              Remove Current Account
                            </span>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>

        {/* settings */}
        <div className='col-span-12 '>
          <div className='bg-white p-5 m-5 max-w-[750px] mx-auto rounded-lg justify-between items-center '>
            <p className='text-xl'>Settings</p>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-lg'>Wallet ID</p>
                <p className='text-sm text-gray-500'>Wallet ID is your unique identifier.</p>
              </div>

              <div className=" text-right bg-gray-100 p-2 px-4 rounded-full">
                <p className='font-semibold flex items-center'>5G16tBnZEmtnL6A5nxZJpJtUw
                  <DocumentDuplicateIcon className=' text-gray-500 ml-2 p-1 h-7 w-7 bg-white rounded-full' /></p>
              </div>
            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-lg'>Change Password</p>
                <p className='text-sm text-gray-500'>Password is password.</p>
              </div>

              <div className=" w-56 text-right">
                <button className='btn ' >
                  <p className=''>Password</p>
                </button>
              </div>
            </div>


            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-lg'>View Your Mnemonic</p>
                <p className='text-sm text-gray-500'>Do not share your private keys with anyone. </p>
              </div>

              <div className=" w-56 text-right ">
                <button onClick={() => setIsMnemonicOpen(true)} className='btn '  >
                  <p className=''>Mnemonic</p>
                </button>
              </div>
            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-lg'>Select Language</p>
                <p className='text-sm text-gray-500'>Set your preferred language</p>
              </div>
              <Dropdown arr={languageArr} defaultValue={language} onClick={setLanguage} />

            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-lg'>Trading Currency</p>
                <p className='text-sm text-gray-500'>Select your trading currency</p>
              </div>
              <Dropdown arr={currencyArr} defaultValue={currency} onClick={setCurrency} />

            </div>
          </div>

        </div>


        <Transition appear
          as={Fragment}
          show={isMnemonicOpen}>
          <Dialog as='div'
            className='relative z-10'
            onClose={closeMnemonic}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 flex items-center'
                    >
                      <p className=' text-gray-700 flex flex-grow'>Export Account Mnemonic</p>

                      <button
                        className='w-16 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-gray-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeMnemonic}
                        type='button'
                      >
                        <XIcon className='h-5 w-5 duration-300 hover:scale-120 transtion east-out' />
                      </button>

                    </Dialog.Title>
                    <div className='mt-2 flex-col space-y-3'>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Address</p>
                        <p className='font-semibold text-xs flex items-center'>5G16tBnZEmtnL6A5nxZJpJtUw
                          <DocumentDuplicateIcon className=' text-gray-500 h-5 w-5' /></p>
                      </div>


                      <p className=' text-gray-700 mt-3 mb-1'>Please input your password</p>
                      <input type="text" placeholder="Password" className=" input input-bordered input-info w-full " />

                      {showMnemonic ? <p className='h-10 w-full'>Mnemonic</p> : <p className=' text-gray-700 mt-3 mb-1 h-10 w-full'></p>}

                      <div className='mt-4'>
                        <button
                          onClick={() => setShowMnemonic(true)}
                          className='w-36 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          type='button'
                        >
                          Export
                        </button>
                      </div>

                    </div>


                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>





      </div>
    </div>
  );
}

export default Settings;
