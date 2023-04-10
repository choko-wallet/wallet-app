// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowDownIcon, CogIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Switch } from '@choko-wallet/app-common';

// import { BalanceInfo,
//   fadeIn,
//   staggerContainer,
//   textContainer,
//   textVariant2 } from '@choko-wallet/app-utils';
import DropDownSelect from './DropDownSelect';

function Swap (): JSX.Element {
  const [showDust, setShowDust] = useState<boolean>(true);
  const [valueInput, setValueInput] = useState<number | null>(null);
  const [valueInput2, setValueInput2] = useState<number | null>(null);

  //   const options = [
  //     { value: "Ethereum", label: "Ethereum" },
  //     { value: "Polygon", label: "Polygon" },
  //     { value: "Polkadot", label: "Polkadot" },
  //   ];

  const chainOptions = ['Ethereum', 'Polygon', 'Polkadot'];

  const tokenOptions = ['Ethereum', 'Polygon', 'Polkadot'];

  // const getTokenImage = (network: string): string => {
  //   if (network.indexOf("Ethereum") !== -1) {
  //     return "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png";
  //   }

  //   if (network.indexOf("Polygon") !== -1) {
  //     return "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png";
  //   }

  //   if (network.indexOf("Polkadot") !== -1) {
  //     return "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/dot.png";
  //   }
  // };

  return (
    <div className='text-white w-full max-w-xl bg-[#1A1A1A] border border-gray-700 rounded-lg p-5'>
      {/* Chain line */}
      <div className='flex items-center justify-center space-x-2'>
        <p className='flex-1 font-poppins font-semibold text-gray-100 text-[15px]'>
          Chain
        </p>
        <p
          //     className='font-poppins font-semibold text-gray-100 text-[15px]'
          className={`${showDust ? 'text-gray-100' : 'text-gray-600'}
        font-poppins font-semibold  text-[15px]`}
        >
          Hide IP
        </p>

        <Switch
          checked={showDust}
          className={`${showDust ? 'bg-[#FDF6E3]' : 'bg-[#FDF6E3]'}
    relative inline-flex h-[19px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mx-2`}
          onChange={setShowDust}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${showDust ? 'translate-x-4' : 'translate-x-0'}
      pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-[#0170BF] shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <CogIcon className='h-5 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 text-gray-100 ' />
      </div>

      {/* big Select */}
      <div className='flex items-center justify-center w-full py-2 '>
        <DropDownSelect options={chainOptions} />
      </div>

      {/* sell and buy */}
      <div className='flex flex-col items-center justify-center space-y-1'>
        <div className='w-full bg-black rounded-lg relative'>
          <p className='absolute top-2 left-2 text-[12px] text-gray-300'>
            You sell
          </p>
          <div className='flex py-10 items-center justify-between pl-4'>
            <input
              className='w-24 text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[30px] '
              onChange={(e) => setValueInput(parseFloat(e.target.value))}
              placeholder={'0'}
              type='number'
              value={valueInput}
            />

            <div className='w-[140px] border border-gray-700 rounded-lg mr-3'>
              <DropDownSelect options={tokenOptions} />
            </div>
          </div>

          <div className='absolute -bottom-4 left-0 right-0 flex items-center justify-center z-20'>
            <div className='w-8 h-8 bg-[#1A1A1A] flex items-center justify-center rounded-md'>
              <ArrowDownIcon className='h-4 text-gray-300 cursor-pointer  ' />
            </div>
          </div>
        </div>

        <div className='w-full bg-black rounded-lg relative'>
          <p className='absolute top-2 left-2 text-[12px] text-gray-300'>
            You buy
          </p>
          <div className='flex py-10 items-center justify-between pl-4 '>
            <input
              className='w-24 text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[30px] '
              onChange={(e) => setValueInput(parseFloat(e.target.value))}
              placeholder={'0'}
              type='number'
              value={valueInput}
            />

            <div className='w-[140px] border border-gray-700 rounded-lg mr-3'>
              <DropDownSelect options={tokenOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className='py-2'>
        <p className='text-gray-300'>Swap Slippage:0.5%</p>
        <div className='flex items-center justify-start  space-x-4'>
          <p className='p-1 bg-gray-600 rounded-md'>0.1%</p>
          <p className='p-1 bg-gray-600 rounded-md'>0.5%</p>
          <p className='p-1 bg-gray-600 rounded-md'>1%</p>

          <div className='bg-black p-1 rounded-md flex px-2'>
            <input
              className='w-full text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[20px] '
              onChange={(e) => setValueInput2(parseFloat(e.target.value))}
              placeholder={'0'}
              type='number'
              value={valueInput2}
            />
            <p>%</p>
          </div>
        </div>
      </div>

      <button
        className=' text-[16px] md:text-[18px] text-white w-full  rounded-md hover:shadow-sm p-2 md:p-2 bg-blue-400 hover:bg-blue-400/80 focus:bg-[#0170BF] font-inter'
        // onClick={() => router.push("/account")}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default Swap;
