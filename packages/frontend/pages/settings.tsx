// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';

/* eslint-disable sort-keys */
function Home(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }

    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
  }, [dispatch, router, userAccount]);

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }


  return (
    <main className='grid grid-cols-12 min-h-screen bg-gray-400'>
      {/* header */}
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
                <p className='text-xl'>Wallet ID</p>
                <p className='text-sm text-gray-500'>Wallet ID is your unique identifier.</p>
              </div>

              <div className=" w-56 text-right">
                <p>5GW95DHJ...FYi3z</p>
              </div>
            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-xl'>Change Password</p>
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
                <p className='text-xl'>View Your Mnemonic</p>
                <p className='text-sm text-gray-500'>Do not share your private keys with anyone. </p>
              </div>

              <div className=" w-56 text-right">
                <button className='btn ' >
                  <p className=''>Mnemonic</p>
                </button>
              </div>
            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-xl'>Select Language</p>
                <p className='text-sm text-gray-500'>Set your preferred language</p>
              </div>

              <div className=" w-56 text-right">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-[150px] justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      English
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >

                              English
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >

                              中文
                            </button>
                          )}
                        </Menu.Item>
                      </div>

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <div className='bg-white m-5 max-w-[700px] mx-auto rounded-lg flex justify-between items-center'>
              <div className='flex-col'>
                <p className='text-xl'>Trading Currency</p>
                <p className='text-sm text-gray-500'>Select your trading currency</p>
              </div>

              <div className=" w-56 text-right">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-[150px] justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      USD
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >

                              USD
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >

                              GBP
                            </button>
                          )}
                        </Menu.Item>
                      </div>

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

        </div>





      </div>
    </main>
  );
}

export default Home;
