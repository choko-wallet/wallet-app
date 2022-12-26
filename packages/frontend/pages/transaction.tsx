// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronRightIcon, DocumentDuplicateIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '@choko-wallet/redux-module/redux/selectors';
import { loadUserAccount } from '@choko-wallet/redux-module/slices/user';

/**
 * IGNORED.. For now.
 */
/* eslint-disable sort-keys */
function Transaction(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [mounted, setMounted] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

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
  }, [userAccount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function closeDetail() {
    setIsDetailOpen(false);
  }

  return (
    <main className='grid grid-cols-12 min-h-screen bg-gray-400'>

      <div className='col-span-12 '>

        {/* header */}
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

        {/* transition */}
        <div className='col-span-12  min-h-screen '>
          <div className='p-5 overflow-x-auto'>
            <p className='text-xl font-semibold'>Transaction History</p>
            <table className='table table-compact w-full'>
              <thead>
                <tr>
                  <th></th>
                  <th>Type</th>
                  <th>Asset</th>
                  <th>Amount</th>
                  <th>Time</th>
                  <th>TxID</th>
                  <th>Status</th>
                  <th></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Send</td>
                  <td>BTC</td>
                  <td>0.01</td>
                  <td>12/16/2020</td>
                  <td>0x123456...456</td>
                  <td>Completed</td>
                  <td onClick={() => setIsDetailOpen(true)}><ChevronRightIcon className='cursor-pointer h-5 w-5' /></td>

                </tr>
                <tr>
                  <th>2</th>
                  <td>Receive</td>
                  <td>ETH</td>
                  <td>100</td>
                  <td>12/16/2020</td>
                  <td>0x123456...456</td>
                  <td>Pending</td>
                  <td onClick={() => setIsDetailOpen(true)}><ChevronRightIcon className='cursor-pointer h-5 w-5' /></td>

                </tr>

              </tbody>

            </table>
          </div>

        </div>

        <Transition appear
          as={Fragment}
          show={isDetailOpen}>
          <Dialog as='div'
            className='relative z-10'
            onClose={closeDetail}>
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
                      <p className=' text-gray-700 flex flex-grow'>Transaction Details</p>

                      <button
                        className='w-16 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-gray-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeDetail}
                        type='button'
                      >
                        <XIcon className='h-5 w-5 duration-300 hover:scale-120 transtion east-out' />
                      </button>

                    </Dialog.Title>
                    <div className='mt-2 flex-col space-y-3'>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Status</p>
                        <p className='font-semibold text-green-500'>Completed</p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Date</p>
                        <p className='font-semibold'>2022-01-01 11:11</p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Currency</p>
                        <p className='font-semibold'>BTC</p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Amount</p>
                        <p className='font-semibold'>0.01</p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Network</p>
                        <p className='font-semibold'>BTC</p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>Address</p>
                        <p className='font-semibold text-xs flex items-center'>5G16tBnZEmtnL6A5nxZJpJtUw
                          <DocumentDuplicateIcon className=' text-gray-500 h-5 w-5' /></p>
                      </div>

                      <div className='flex text-sm justify-between items-center'>
                        <p className='text-gray-500'>TxID</p>
                        <p className='font-semibold text-xs flex items-center'>0x5G16tBnZEmtnL6A5nxZJpJtUw
                          <DocumentDuplicateIcon className=' text-gray-500 h-5 w-5' /></p>
                      </div>

                    </div>

                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

      </div>
    </main>
  );
}

export default Transaction;
