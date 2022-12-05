// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment, useEffect, useState } from 'react';

import { BalanceInfo } from '../../utils/types';

/**
 * The dropdown to select crypto asset to send
 */

interface Props {
  balanceInfo: BalanceInfo;
  setCryptoAddress: (value: string) => void;
}

function DropdownForSend ({ balanceInfo, setCryptoAddress }: Props): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterResult, setFilterResult] = useState<BalanceInfo>(balanceInfo);

  useEffect(() => {
    if (searchInput && searchInput.length !== 0) {
      const result = Object.fromEntries(
        Object.entries(balanceInfo)
          .filter(([_, info]) => {
            return info.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
          })
      );

      setFilterResult(result);
    }
  }, [searchInput, balanceInfo]);

  return (
    <div className=' w-full  text-right'>
      <Menu as='div'
        className='relative h-12 pt-1 inline-block text-left w-full border rounded-lg border-gray-300 dark:border-blue-300'>
        <div>
          <Menu.Button className='inline-flex items-center justify-center rounded-md w-full bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none '>

            <div className='relative h-6 w-6'>
              <img alt='icon'
                className='w-[90%] h-[90%] object-contain'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png';
                }}
                src={balanceInfo.native.img || 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'}
              />
            </div>
            <p className='flex flex-grow mx-3 text-black dark:text-white font-poppins'> {balanceInfo.native.name}</p>
            <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-gray-700 dark:text-white' />
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
          <Menu.Items className='z-50 absolute right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gradient-to-br from-gray-800 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 border border-blue-300 rounded-md'>

              <div className='flex py-1  items-center  border-b border-gray-600 pb-1'>
                <input
                  className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none '
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder='Search for Coin'
                  type='text'
                  value={searchInput} />
                <SearchIcon className='hidden h-8 p-2 text-blue-400 bg-gray-600 rounded-full cursor-pointer md:inline md:mx-2' />
              </div>

              {Object.entries(filterResult).map(([address, info], i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button className={`${active ? 'bg-violet-500 dark:bg-gray-700 text-white font-poppins' : 'font-poppins text-gray-900'
                    } group flex w-full items-center dark:text-white rounded-md px-2 py-2 text-sm`}
                    onClick={() => setCryptoAddress(address)}
                    >
                      <div className='relative h-5 w-5 ml-2 mr-3'>
                        <img alt='icon'
                          className='w-[90%] h-[90%] object-contain'
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png';
                          }}
                          src={info.img || 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'}
                        />
                      </div>
                      {info.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default DropdownForSend;
