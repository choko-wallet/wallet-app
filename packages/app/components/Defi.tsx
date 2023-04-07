// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Switch } from "@choko-wallet/app-common";

import {
  BalanceInfo,
  fadeIn,
  staggerContainer,
  textContainer,
  textVariant2,
} from "@choko-wallet/app-utils";

import Select from "react-select";

function Defi(): JSX.Element {
  const [showDust, setShowDust] = useState<boolean>(true);
  const [valueInput, setValueInput] = useState<number | null>(null);
  const [valueInput2, setValueInput2] = useState<number | null>(null);

  const options = [
    { value: "Ethereum", label: "Ethereum" },
    { value: "Polygon", label: "Polygon" },
    { value: "Polkadot", label: "Polkadot" },
  ];
  return (
    <div className=' mb-6 lg:mb-12 w-full bg-transparent dark:bg-[#0A0A0B] mx-auto p-2 sm:p-3 md:p-6'>
      <div className='w-full max-w-6xl min-h-[750px] bg-[#1A1A1A] mx-auto rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8 relative'>
        <div className='md:flex '>
          <div className='text-white w-full bg-[#1A1A1A] border border-gray-700 rounded-lg p-5'>
            {/* Chain line */}
            <div className='flex items-center justify-center space-x-2'>
              <p className='flex-1 font-poppins'>Chain</p>
              <p className='font-poppins text-gray-300'>Hide IP</p>

              <Switch
                checked={showDust}
                className={`${showDust ? "bg-[#FDF6E3]" : "bg-[#FDF6E3]"}
          relative inline-flex h-[19px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mx-2`}
                onChange={setShowDust}
              >
                <span className='sr-only'>Use setting</span>
                <span
                  aria-hidden='true'
                  className={`${showDust ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-[#0170BF] shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <CogIcon className='h-5 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 text-gray-300 ' />
            </div>

            {/* big Select */}
            <div className='flex items-center justify-center w-full py-2 '>
              <Select className='w-full ' options={options} />
            </div>

            {/* sell and buy */}
            <div className='flex flex-col items-center justify-center space-y-1'>
              <div className='w-full bg-black rounded-lg relative'>
                <p className='absolute top-2 left-2 text-[12px] text-gray-300'>
                  You sell
                </p>
                <div className='flex py-10 items-center justify-between px-10'>
                  <input
                    value={valueInput}
                    onChange={(e) => setValueInput(parseFloat(e.target.value))}
                    className='w-24 text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[30px] '
                    type='number'
                    placeholder={"0"}
                  />

                  <div className=''>
                    <Select options={options} />
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
                <div className='flex py-10 items-center justify-between px-10'>
                  <input
                    value={valueInput}
                    onChange={(e) => setValueInput(parseFloat(e.target.value))}
                    className='w-24 text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[30px] '
                    type='number'
                    placeholder={"0"}
                  />

                  <div className=''>
                    <Select options={options} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p>Swap Slippage:0.5%</p>
              <div className='flex items-center justify-center space-x-2'>
                <p className='p-1 bg-gray-600 rounded-md'>0.1%</p>
                <p className='p-1 bg-gray-600 rounded-md'>0.5%</p>
                <p className='p-1 bg-gray-600 rounded-md'>1%</p>

                <input
                  value={valueInput2}
                  onChange={(e) => setValueInput2(parseFloat(e.target.value))}
                  className='w-24 text-gray-300 placeholder-gray-400 bg-transparent outline-none text-[30px] '
                  type='number'
                  placeholder={"0"}
                />
              </div>
            </div>

            <button
              className=' text-[16px] md:text-[18px] text-white w-full  rounded-md hover:shadow-sm p-2 md:p-2 bg-blue-400 hover:bg-blue-400/80 focus:bg-[#0170BF] font-inter'
              // onClick={() => router.push("/account")}
            >
              Connect Wallet
            </button>
          </div>

          <div className='text-white mt-32'>price</div>
        </div>

        <div className='md:flex '>
          <div className='text-white'>total value</div>
          <div className='text-white'>chart</div>
        </div>
      </div>
    </div>
  );
}

export default Defi;
