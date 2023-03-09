// Copyright 2021-2022 @choko-wallet/network-sidebar-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';

import { toggle, useDispatch } from '@choko-wallet/app-redux';

import NetworkSelection from './NetworkSelectionList';

/**
 * wrapper of the NetworkSelection list for widescreen devices
 */

export default function NetworkSidebar (): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className='bg-transparent'>
      <button
        className='md:hidden mb-2 w-[110px] h-[30px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-white rounded-[4px] outline-none '
        onClick={() => dispatch(toggle('homeMobileDrawer'))}
      >
        <p className='ml-1 text-black text-[16px] font-medium font-kanit '>NETWORK</p>
        <ChevronRightIcon className=' text-[#0170BF] h-3 w-3 ml-2' />
      </button>

      <div className='hidden md:inline-flex md:flex-col bg-transparent dark:bg-[#0A0A0B]  md:h-full mr-10' >
        <p className='ml-1 hidden md:block text-gray-800 dark:text-white text-md font-semibold font-kanit '>NETWORK</p>
        {/* wideScreen network */}
        <NetworkSelection />
      </div>

    </div>
  );
}
