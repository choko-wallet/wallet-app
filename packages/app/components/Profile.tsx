// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  SwitchHorizontalIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { setOpen, useDispatch } from '@choko-wallet/app-redux';
// import Mapbox from '@choko-wallet/app/components/Mapbox';
import { BalanceInfo,
  fadeIn,
  staggerContainer,
  textContainer,
  textVariant2 } from '@choko-wallet/app-utils';
import { BalanceRow } from '@choko-wallet/balance-module';

import ReceiveTokenModal from './modal/ReceiveTokenModal';
import SendTokenModal from './modal/SendTokenModal';
import Chart from './Chart';

interface Props {
  balance: BalanceInfo;
}

function Profile ({ balance }: Props): JSX.Element {
  const [filtedBalance, setFiltedBalance] = useState<BalanceInfo>(balance);
  const [balanceTotal, setBalanceTotal] = useState<string>('0');
  const [showDust, _] = useState<boolean>(true);
  const dispatch = useDispatch();

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

    <div className=' mb-6 lg:mb-12 w-full bg-transparent dark:bg-[#0A0A0B] mx-auto p-2 sm:p-3 md:p-6 '>
      <div className='w-full max-w-[950px] min-h-[750px] bg-transparent dark:bg-[#1A1A1A] mx-auto rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8 relative'>
        <div className='flex '>
          <div className='flex flex-col w-full  max-w-[950px] mx-auto'>
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
                className=' z-10  flex flex-col items-center justify-center'
                variants={fadeIn('left', 'tween', 0, 0.5)}
              >
                <motion.p
                  className='text-[26px]  text-black dark:text-white font-inter font-semibold'
                  variants={textContainer}
                >
                  {Array.from(`$ ${balanceTotal} USD`).map((letter, index) => (
                    <motion.span key={index}
                      variants={textVariant2}>
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.p>

                <div className='flex items-center justify-center space-x-4'>
                  <p className='text-[16px] text-[#ADADAD] dark:text-gray-300 cursor-pointer font-inter '>
                    + $0.0
                  </p>
                  <div className=' text-[16px] rounded-full font-roboto text-[#2EBE7B] flex items-center justify-center'>
                    <p className='ml-1'>+ 0.0%</p>
                    {/* <ArrowUpIcon className='rotate-45 w-3 h-3' /> */}
                  </div>
                </div>
              </motion.div>

              <Chart />
            </motion.div>

            <div className='flex items-center justify-center space-x-2 mt-3'>
              <button className='flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 p-2 w-full rounded-xl hover:opacity-80 active:scale-90 transition duration-150 ease-in-out'>
                <SwitchHorizontalIcon className='w-6 h-6 text-gray-300 my-1' />
                <p className='text-gray-300 text-[12px]'>Swap</p>
              </button>

              <button className='flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 p-2 w-full rounded-xl hover:opacity-80 active:scale-90 transition duration-150 ease-in-out'>
                <CurrencyDollarIcon className='w-6 h-6 text-gray-300 my-1' />
                <p className='text-gray-300 text-[12px]'>Buy</p>
              </button>

              <button
                className='flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 p-2 w-full rounded-xl hover:opacity-80 active:scale-90 transition duration-150 ease-in-out'
                onClick={() => dispatch(setOpen('homeSend'))}
              >
                <ArrowUpIcon className='w-6 h-6 text-gray-300 my-1' />
                <p className='text-gray-300 text-[12px]'>Send</p>
              </button>

              <button
                className='flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 p-2 w-full rounded-xl hover:opacity-80 active:scale-90 transition duration-150 ease-in-out'
                onClick={() => dispatch(setOpen('homeReceive'))}
              >
                <ArrowDownIcon className='w-6 h-6 text-gray-300 my-1' />
                <p className='text-gray-300 text-[12px]'>Receive</p>
              </button>
            </div>

            <div className='flex items-center justify-between w-full max-w-[900px] p-1 pt-4 '>
              <p className='flex text-black font-inter dark:text-[#DADADA]'>
                Tokens
              </p>
              <p className='flex text-black font-semibold font-inter dark:text-[#DADADA] whitespace-nowrap'>
                See All
                <ChevronRightIcon className='w-6 h-6 text-black dark:text-gray-300 mx-1' />
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

      <SendTokenModal balanceInfo={balance} />
      <ReceiveTokenModal />
    </div>
  );
}

export default Profile;
