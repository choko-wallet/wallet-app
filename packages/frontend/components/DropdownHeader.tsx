// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, DotsHorizontalIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon, DocumentDuplicateIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import btcIcon from '../images/btc.png';

interface Crypto {
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: string;
  estimatedTime: string;
  arrival: string;
  MinDeposit: string;
}

interface Props {
  // arr: Crypto[];
  // defaultValue: Crypto;
  // onClick?: (value: Crypto) => void;
  currentAccount: string;
}

function DropdownHeader ({ currentAccount }: Props) {
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    console.log('first');
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <div className='w-24 md:w-64 text-right'>
      <Menu as='div'
        className='relative h-12 pt-1 inline-block text-left w-full border rounded-lg border-gray-300 dark:border-[#00f6ff]'>
        <div>
          <Menu.Button className='inline-flex items-center justify-center rounded-md w-full bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

            <div className='relative h-6 w-6'>
              <UserCircleIcon className='h-6 w-6 dark:text-[#03F3FF] ' />

            </div>

            <p className='font-poppins text-gradient whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
              {currentAccount.substring(0, 7)}
              <DotsHorizontalIcon className='dark:text-[#03F3FF] h-6 w-6 mx-1' />
              {currentAccount.substring(currentAccount.length - 7, currentAccount.length)}
            </p>
            <ChevronDownIcon className='dark:text-[#03F3FF] ml-2 -mr-1 h-6 w-6 text-gray-700 ' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='z-50 absolute right-0 mt-1 w-64 md:w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gradient-to-br from-gray-900 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:border-[#00f6ff]'>
            <div className='px-1 py-1 '>

              <div className='h-12'>
                <button className='flex w-full items-center rounded-md px-2 py-2 text-sm'>

                  <p className='font-poppins whitespace-nowrap flex text-center items-center justify-certer flex-grow  ml-2 text-gradient'>{currentAccount.substring(0, 7)}
                    <DotsHorizontalIcon className='h-6 w-6 dark:text-[#03F3FF] mx-1' />

                    {currentAccount.substring(currentAccount.length - 7, currentAccount.length)}</p>

                  <CopyToClipboard onCopy={() => { setCopied(true); }}
                    text={currentAccount}>
                    <div onClick={handleCopy}>
                      {showCheck
                        ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                        : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                    </div>
                  </CopyToClipboard>

                </button>

              </div>

              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active ? 'font-poppins bg-violet-500 dark:bg-gray-900 text-white' : 'font-poppins text-gray-900'
                    } group flex w-full items-center h-12 justify-center rounded-md px-2 py-2 text-sm`}
                  >

                    <p className='text-gradient '>Add New Account</p>

                  </button>
                )}
              </Menu.Item>

              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 dark:bg-gray-900 text-white' : 'text-gray-900'
                    } group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm`}
                  >

                    <p className='font-poppins text-gradient text-center'>Remove Account</p>

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
