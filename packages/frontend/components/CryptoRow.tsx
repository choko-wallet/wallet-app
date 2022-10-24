// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface Props {
  balance: number;
  name: string;
  img: string;
  price: number;
  shortName: string;

}

function CryptoRow({ balance, img, name, price, shortName }: Props): JSX.Element {
  return (
    <div className=' w-full text-right p-1 '>
      <div className='flex flex-row p-3 rounded-lg bg-[#F6F6F6] dark:bg-[#384855] dark:hover:bg-[#4797B5]  hover:bg-[#4797B5]'>
        <div className='flex justify-between flex-grow'>
          <div className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-transparent dark:bg-gray-700'>
            <img alt='icon'
              className='w-[70%] h-[70%] object-contain'
              src={img}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'
              }}
            />
          </div>
          <div className='flex flex-col flex-1 ml-3'>
            <p className='flex flex-grow font-semibold text-black dark:text-white text-[22px]  font-poppins'>
              {name}
            </p>
            <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[14px]  font-poppins'>
              {price}{' '}USD
            </p>
          </div>
        </div>
        <div className=' flex flex-col justify-between '>
          <p className=' font-semibold text-black dark:text-white flex flex-grow text-[18px] mt-2 font-poppins'>
            {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}{'  '}{shortName}

          </p>
          <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[14px]  font-poppins'>
            {Number(balance * price).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
          </p>
        </div>
      </div>
    </div>
  );
}

export default CryptoRow;
