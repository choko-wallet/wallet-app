// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';

interface Crypto {
  balance: number,
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: number;
  estimatedTime: string;
  arrival: string;
  minDeposit: number;
}

interface Props {
  Cryptos: Crypto[];
  defaultValue: Crypto;
  onClick?: (value: Crypto) => void;
}

function DropdownForSend ({ Cryptos, defaultValue, onClick }: Props): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterResult, setFilterResult] = useState<Crypto[]>(Cryptos);

  useEffect(() => {
    function filterCoin (item: Crypto) {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    }

    const result = Cryptos.filter(filterCoin);

    setFilterResult(result);
  }, [searchInput, Cryptos]);

  return (
    <div className=' w-full  text-right'>
      <Menu as='div'
        className='relative h-12 pt-1 inline-block text-left w-full border rounded-lg border-gray-300 dark:border-blue-300'>
        <div>
          <Menu.Button className='inline-flex items-center justify-center rounded-md w-full bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

            <div className='relative h-5 w-5'>
              <Image
                layout='fill'
                objectFit='contain'
                src={defaultValue.img}
              />
            </div>
            <p className='flex flex-grow mx-3 text-black dark:text-white font-poppins'> {defaultValue.name}</p>
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
          <Menu.Items className='z-50 absolute right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>

              <div className='flex py-1  items-center rounded-md border border-gray-600'>
                <input
                  className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none '
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder='Search for Coin'
                  type='text'
                  value={searchInput} />
                <SearchIcon className='hidden h-8 p-2 text-white bg-gray-500 rounded-full cursor-pointer md:inline md:mx-2' />
              </div>

              {filterResult.map((item) => (
                <Menu.Item key={item.img}>
                  {({ active }) => (
                    <button className={`${active ? 'bg-violet-500 dark:bg-gray-700 text-white font-poppins' : 'font-poppins text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => onClick(item)}
                    >
                      <div className='relative h-5 w-5 ml-2 mr-3'>
                        <Image
                          layout='fill'
                          objectFit='contain'
                          src={item.img}
                        />
                      </div>
                      {item.name}

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
