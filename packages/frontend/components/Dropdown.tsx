// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';

interface Props {
  arr: string[]
  defaultValue: string
  onClick?: (value: string) => void;
}

function Dropdown ({ arr, defaultValue, onClick }: Props) {
  return (
    <div className=' w-56 text-right'>
      <Menu as='div'
        className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-[150px] justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            {defaultValue}
            <ChevronDownIcon
              aria-hidden='true'
              className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
            />
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
          <Menu.Items className='z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1'>

              {arr.map((item) => (
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? 'bg-violet-500 text-white font-poppins' : 'font-poppins text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => onClick(item)}
                    >
                      {item}
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

export default Dropdown;
