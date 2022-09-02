import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Image from 'next/image'

import btcIcon from '../images/btc.png'

interface Crypto {
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: string;
  estimatedTime: string;

};


interface Props {
  arr: string[];
  defaultValue: string;
  onClick?: (value: string) => void;
}

function DropdownForNetwork({ arr, defaultValue, onClick }: Props) {
  return (
    <div className=" w-full  text-right">
      <Menu as="div" className="relative h-12 pt-1 inline-block text-left w-full border rounded-lg border-gray-300 dark:border-blue-300">
        <div>
          <Menu.Button className="inline-flex items-center justify-center rounded-md w-full bg-white px-4 py-2 text-sm dark:bg-transparent font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">


            <p className='flex flex-grow dark:text-white'> {defaultValue}</p>
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-700 dark:text-white" />
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
          <Menu.Items className="dark:bg-gray-400 z-50 absolute right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">

              {arr.map((item) => (
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={() => onClick(item)}
                      className={`${active ? 'bg-violet-500 dark:bg-gray-700 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
  )
}

export default DropdownForNetwork
