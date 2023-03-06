// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowUpIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// import Mapbox from '@choko-wallet/app/components/Mapbox';
import { BalanceInfo,
  fadeIn,
  staggerContainer,
  textContainer,
  textVariant2 } from '@choko-wallet/app-utils';
import { BalanceRow } from '@choko-wallet/balance-module';

import Chart from './Chart';

interface Props {
  balance: BalanceInfo;
}

function Profile ({ balance }: Props): JSX.Element {
  const [filtedBalance, setFiltedBalance] = useState<BalanceInfo>(balance);
  const [balanceTotal, setBalanceTotal] = useState<string>('0');
  const [showDust, _] = useState<boolean>(true);

  console.log('balance-profile', balance);

  useEffect(() => {
    // Filter out Dust balance
    const filtered = Object.entries(balance).filter(([id, item]) => {
      return showDust ? item.balanceInUSD > 5 || id === 'native' : true; // always display eth .. even it's in dust
    });

    setFiltedBalance(Object.fromEntries(filtered));
  }, [showDust, balance]);

  useEffect(() => {
    // Calculate total balance
    const b = Object.entries(balance).reduce((pre, [_, item]) => {
      return pre + item.balanceInUSD;
    }, 0);

    setBalanceTotal(
      Number(b).toLocaleString(undefined, { maximumFractionDigits: 2 })
    );
  }, [balance]);

  return (
  // <div className='relative flex flex-col bg-transparent dark:bg-[#1A1A1A] w-full rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8'></div>

    <div className=' my-6 lg:my-12 w-full bg-transparent dark:bg-[#0A0A0B] mx-auto p-2 sm:p-3 md:p-6'>
      <div className='w-full max-w-[1500px] min-h-[750px] bg-[#1A1A1A] mx-auto rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8 relative'>
        <div className='flex '>
          <div className='flex flex-col w-full  max-w-[950px]'>
            {/* <div className='flex space-x-4 w-full  justify-between '> */}
            <motion.div
              className='flex  flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full justify-between '
              initial='hidden'
              variants={staggerContainer}
              viewport={{ amount: 0.25, once: false }}
              whileInView='show'
            >
              {/* <div className=' h-[100px] z-10 relative'> */}
              <motion.div
                className='h-[100px] z-10 relative px-2'
                variants={fadeIn('left', 'tween', 0, 0.5)}
              >
                {/* <p className='text-xl my-1 text-black dark:text-white font-inter font-semibold'>
                  $200.00 USD </p> */}

                <motion.p
                  className='text-xl my-1 text-black dark:text-white font-inter font-semibold'
                  variants={textContainer}
                >
                  {Array.from(`$ ${balanceTotal} USD`).map((letter, index) => (
                    <motion.span key={index}
                      variants={textVariant2}>
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.p>

                <p className='text-xs text-[#ADADAD] dark:text-[#ADADAD] cursor-pointer font-inter mt-5'>
                  + $22.10
                </p>
                <div className='absolute top-11 left-[70px] text-[10px] rounded-full py-[2px] px-[5px] border border-[#2EBE7B] font-roboto text-[#2EBE7B] flex items-center justify-center'>
                  <p className='ml-1'>+1,2%</p>
                  <ArrowUpIcon className='rotate-45 w-3 h-3' />
                </div>
              </motion.div>

              <Chart />
            </motion.div>

            <div className='flex items-center justify-between w-full max-w-[900px]  p-5'>
              <p className='hidden sm:inline-flex text-black font-inter dark:text-[#DADADA]'>
                My Assets
              </p>
              <p className='hidden sm:inline-flex text-black font-inter dark:text-[#DADADA] '>
                Total Balance
              </p>
            </div>

            <div className='flex flex-col scrollbar-thin min-h-[400px] h-full overflow-y-scroll z-20 w-full max-w-[1000px]'>
              {Object.entries(filtedBalance).map(([_, item], index) => (
                <BalanceRow
                  balance={item.balance}
                  img={item.img}
                  key={index}
                  name={item.name}
                  price={item.priceInUSD}
                  symbol={item.symbol}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
