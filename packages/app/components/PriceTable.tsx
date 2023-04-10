// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import React from 'react';

import PriceRow from './PriceRow';

function PriceTable (): JSX.Element {
  const cryptocurrencyPrices = [
    {
      change: 0.54,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png',
      name: 'Bitcoin',
      price: 28449.05
    },
    {
      change: 0.59,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png',
      name: 'Ethereum',
      price: 1826.87
    },
    {
      change: 0.01,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdt.png',
      name: 'Tether',
      price: 1.02
    },
    {
      change: 0.54,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png',
      name: 'Bitcoin',
      price: 28449.05
    },
    {
      change: 0.59,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png',
      name: 'Ethereum',
      price: 1826.87
    },
    {
      change: 0.01,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdt.png',
      name: 'Tether',
      price: 1.02
    },
    {
      change: 0.54,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png',
      name: 'Bitcoin',
      price: 28449.05
    },
    {
      change: 0.59,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png',
      name: 'Ethereum',
      price: 1826.87
    },
    {
      change: 0.01,
      img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdt.png',
      name: 'Tether',
      price: 1.02
    }
  ];

  return (
    <div className='text-white w-full max-w-xl bg-[#1A1A1A] border border-gray-700 rounded-lg p-5'>
      <div className='flex items-center justify-center space-x-2'>
        <p className='flex-1 font-poppins font-semibold text-gray-100 text-[15px]'>
          Today Cryptocurrency Prices
        </p>
      </div>

      <div className='flex items-center justify-between w-full px-3 py-2 my-1 md:my-3 bg-black rounded-md'>
        <div className='flex space-x-1'>
          <p className=' text-[10px] md:text-[14px] font-poppins cursor-pointer hover:text-blue-400'>
            NAME
          </p>
          <div className='flex flex-col items-center justify-center'>
            <ChevronUpIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
            <ChevronDownIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
          </div>
        </div>

        <div className='flex space-x-1'>
          <p className=' text-[10px] md:text-[14px] font-poppins ml-16 hover:text-blue-400'>
            PRICE
          </p>
          <div className='flex flex-col items-center justify-center cursor-pointer '>
            <ChevronUpIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
            <ChevronDownIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
          </div>
        </div>

        <div className='flex space-x-1'>
          <p className=' text-[10px] md:text-[14px] font-poppins whitespace-nowrap cursor-pointer hover:text-blue-400'>
            24H CHANGE
          </p>
          <div className='flex flex-col items-center justify-center'>
            <ChevronUpIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
            <ChevronDownIcon className='text-white h-2 w-2 cursor-pointer hover:text-blue-400' />
          </div>
        </div>
      </div>

      {cryptocurrencyPrices.map(({ change, img, name, price }) => (
        <PriceRow
          change={change}
          img={img}
          key={name}
          name={name}
          price={price}
        />
      ))}
    </div>
  );
}

export default PriceTable;
