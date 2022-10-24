// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Transition } from '@headlessui/react';
import { DotsHorizontalIcon, UserCircleIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUserAccount, selectUserAccount } from '../features/redux/selectors';
import { removeAllAccounts } from '../features/slices/userSlice';
import DropdownHeaderRow from './DropdownHeaderRow';

interface Props {
  setChangeAccountLoading: (value: boolean) => void;
  changeAccount: (value: string) => void;
}

function DropdownHeader({ setChangeAccountLoading, changeAccount }: Props): JSX.Element {
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const userAccountArray = Object.entries(userAccount);
  const router = useRouter();

  const removeAccounts = () => {
    dispatch(removeAllAccounts());
    void router.push('/');
  };

  return (
    <div className='w-24 md:w-64 text-right'>
      <Menu as='div'
        className='relative h-12 text-left w-full border border-gray-300  dark:border-[#00f6ff] rounded-lg '>

        <Menu.Button className='flex items-center justify-center rounded-md w-full bg-white  dark:bg-transparent px-4 py-2 h-full text-sm font-medium text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

          <div className='relative h-6 w-6'>
            <UserCircleIcon className='h-6 w-6 dark:text-white text-gray-800' />

          </div>

          <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
            {currentUserAccount?.address.substring(0, 7)}
            <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
            {currentUserAccount?.address.substring(currentUserAccount?.address.length - 7,
              currentUserAccount?.address.length)}
          </p>
          <ChevronDownIcon className='dark:text-white ml-2 -mr-1 h-6 w-6 text-gray-800 ' />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='z-50 absolute right-0 mt-1 w-64 md:w-full origin-top-right divide-y divide-gray-100 rounded-md bg-gray-100 dark:bg-gradient-to-br from-gray-900 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:border-[#00f6ff]'>
            <div className='px-1 py-1 '>

              {/* 直接map */}

              {userAccountArray.map((account) => (
                <DropdownHeaderRow account={account[1]}
                  key={account[1].address}
                  setChangeAccountLoading={setChangeAccountLoading}
                  changeAccount={changeAccount}
                />
              ))}

              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active
                      ? 'font-poppins bg-violet-500 dark:bg-gray-900 text-white'
                      : 'font-poppins text-gray-900'
                      } group flex w-full items-center h-12 justify-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => router.push('/account')}
                  >

                    <p className='text-black dark:text-white '>Add New Account</p>

                  </button>
                )}
              </Menu.Item>

              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 dark:bg-gray-900 text-white' : 'text-gray-900'
                      } group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm`}
                    onClick={removeAccounts}

                  >
                    <p className='font-poppins text-black dark:text-white text-center'>Remove All Accounts</p>
                  </button>
                )}
              </Menu.Item>

            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div >
  );
}

export default DropdownHeader;
