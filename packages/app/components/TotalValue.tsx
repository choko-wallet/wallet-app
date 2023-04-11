// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DownloadIcon } from '@heroicons/react/outline';
import React from 'react';

function TotalValue (): JSX.Element {
  return (
    <div className='flex flex-col space-y-2 my-4 w-full'>
      <div className='flex flex-col items-start justify-center p-5 border border-gray-700 rounded-xl relative hover:opacity-80'>
        <p className='text-gray-700 dark:text-gray-300 font-poppins'>
          Total Value Locked (USD)
        </p>
        <p className='text-blue-300 text-[30px] font-semibold font-poppins'>
          $50.4b
        </p>

        <div className='absolute bottom-3 right-3 p-1 rounded-md bg-gray-700 flex items-center justify-center hover:bg-slate-500'>
          <DownloadIcon className='text-gray-300 w-4 h-4' />
          <p className='text-gray-300'>.csv</p>
        </div>
      </div>

      <div className='flex flex-col items-start justify-center p-5 border border-gray-700 rounded-xl hover:opacity-80'>
        <p className='text-gray-700 dark:text-gray-300 font-poppins'>
          Change (24h)
        </p>
        <p className='text-red-500 text-[30px] font-semibold font-poppins'>
          -1.39%
        </p>
      </div>

      <div className='flex flex-col items-start justify-center p-5 border border-gray-700 rounded-xl hover:opacity-80'>
        <p className='text-gray-700 dark:text-gray-300 font-poppins'>
          Lido Dominance
        </p>
        <p className='text-green-300 text-[30px] font-semibold font-poppins'>
          22.20%
        </p>
      </div>
    </div>
  );
}

export default TotalValue;
