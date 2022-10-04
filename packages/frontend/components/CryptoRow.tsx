// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import btcIcon from '../images/btc.png';

interface Props {
  name: string;
  img: string;
  price: number;
  shortName: string;

}

function CryptoRow ({ img, name, price, shortName }: Props) {
  return (
    <div className=' w-full text-right p-1 '>
      <div className='flex flex-row p-3 rounded-lg bg-[#F6F6F6] dark:bg-[#384855] dark:hover:bg-[#4797B5]  hover:bg-[#4797B5]'>
        <div className='flex justify-between flex-grow'>
          <div className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-transparent dark:bg-gray-700'>
            <img alt='star'
              className='w-[70%] h-[70%] object-contain'
              src={img} />
          </div>
          <div className='flex flex-col flex-1 ml-3'>
            <p className='flex flex-grow font-semibold text-black dark:text-white text-[22px]  font-poppins'>
              {name}
            </p>
            <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[14px]  font-poppins'>
              {price}
            </p>
          </div>
        </div>
        <div className=' flex flex-col justify-between '>
          <p className=' font-semibold text-black dark:text-white flex flex-grow text-[18px] mt-2 font-poppins'>
            {'0.005' + ' '}{shortName}
          </p>
          <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[14px]  font-poppins'>
            {price} USD
          </p>
        </div>
      </div>
    </div>
  );
}

export default CryptoRow;
