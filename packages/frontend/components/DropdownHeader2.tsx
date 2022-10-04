// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, DotsHorizontalIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon, DocumentDuplicateIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { knownNetworks } from '@choko-wallet/known-networks';

import { selectCurrentUserAccount, selectError, selectUserAccount } from '../features/redux/selectors';
import { store } from '../features/redux/store';
import { loadUserAccount, removeAllAccounts } from '../features/slices/userSlice';
import btcIcon from '../images/btc.png';
import DropdownHeaderRow from './DropdownHeaderRow';

function DropdownHeader2 () {
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);// 所有账户
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const reduxError = useSelector(selectError);
  // const currentUserAccountAdd = Object.keys(currentUserAccount)[0];//拿add
  // const currentUserAccountObj = Object.entries(currentUserAccount)[0][1];//拿到obj 容易报错
  const userAccountArr = Object.entries(userAccount);// 可以map

  const router = useRouter();

  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    console.log('first');
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  const removeAccounts = () => {
    dispatch(removeAllAccounts());
    router.push('/');
  };

  // console.log('store', store.getState());
  // console.log('currentUserAccount1', currentUserAccount.address);
  // console.log('reduxError', reduxError);
  // console.log('userAccount1', userAccount);
  // console.log('userAccountArr', userAccountArr);

  // console.log('currentUserAccountAdd', currentUserAccountAdd);
  // // console.log('userAccountadd', userAccountArr[0][1].address);
  // // console.log('userAccountadd', userAccountArr[1][1].address);

  // console.log('currentUserAccountObj', Object.entries(currentUserAccount));

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

              {userAccountArr.map((accountObj) => (
                <DropdownHeaderRow accountObj={accountObj[1]}
                  key={accountObj[1].address} />
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

export default DropdownHeader2;
