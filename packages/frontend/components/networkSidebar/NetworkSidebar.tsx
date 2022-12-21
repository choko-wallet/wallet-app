// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import NetworkSelection from '@choko-wallet/frontend/components/networkSidebar/NetworkSelectionList';
import { toggle } from '@choko-wallet/frontend/features/slices/status';

/**
 * wrapper of the NetworkSelection list for widescreen devices
 */

export default function NetworkSidebar (): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className='bg-transparent'>
      <button
        className='md:hidden mb-2 w-[158px] h-[40px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none '
        onClick={() => dispatch(toggle('homeMobileDrawer'))}
      >
        <p className='ml-1  text-white text-base font-bold font-poppins '>NETWORK</p>
        <ChevronRightIcon className=' text-white h-6 w-6 ml-6' />
      </button>

      <div className='hidden md:inline-flex md:flex-col bg-transparent dark:bg-[#22262f]  md:h-full mr-10' >
        <p className='ml-1 hidden md:block text-gray-800 dark:text-white text-md font-semibold font-poppins '>NETWORK</p>
        {/* wideScreen network */}
        <NetworkSelection />
      </div>

    </div>
  );
}
