// Copyright 2021-2022 @choko-wallet/balance-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BalanceInfo } from '@choko-wallet/app-utils';

import { ArrowUpIcon, DownloadIcon, PaperAirplaneIcon, PlusSmIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import { Button, Switch } from '@choko-wallet/app-common';
import { selectCurrentNetwork, selectKnownNetworks, setOpen, useDispatch, useSelector } from '@choko-wallet/app-redux';

import BalanceRow from './BalanceRow';

/**
 * The balance display on the right of the home dashboard
 */

interface Props {
  balance: BalanceInfo;
}

function Balance ({ balance }: Props): JSX.Element {
  const dispatch = useDispatch();
  // const ref = useRef(null);

  const knownNetworks = useSelector(selectKnownNetworks);
  const currentNetwork = useSelector(selectCurrentNetwork);

  const [balanceTotal, setBalanceTotal] = useState<string>('0');
  const [showDust, setShowDust] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);
  const [filtedBalance, setFiltedBalance] = useState<BalanceInfo>(balance);

  useEffect(() => {
    // Token search handler
    const filtered = Object.entries(balance).filter(([_, item]) => {
      return item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchInput.toLowerCase());
    });

    setFiltedBalance(Object.fromEntries(filtered));
  }, [searchInput, balance]);

  useEffect(() => {
    // Filter out Dust balance
    const filtered = Object.entries(balance).filter(([id, item]) => {
      return showDust ? (item.balanceInUSD > 5 || id === 'native') : true; // always display eth .. even it's in dust
    });

    setFiltedBalance(Object.fromEntries(filtered));
  }, [showDust, balance]);

  useEffect(() => {
    // Calculate total balance
    const b = Object.entries(balance).reduce((pre, [_, item]) => {
      return pre + item.balanceInUSD;
    }, 0);

    setBalanceTotal(Number(b).toLocaleString(undefined, { maximumFractionDigits: 2 }));
  }, [balance]);

  // const handleClick = () => {
  //   setSearchInputOpen(true);

  //   // TODO: what's this for?
  //   /* eslint-disable */
  //   // @ts-ignore
  //   // ref.current.focus();
  //   /* eslint-enable */
  // };

  return (
    <div className='relative flex flex-col bg-white dark:bg-[#1A1A1A] w-full rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8'>
      {/* <div className='absolute top-0 bottom-0 left-0 right-0 bg-[#DADADA] opacity-40 z-10'></div> */}
      <div className='w-full h-[100px] sm:w-[360px] z-10 relative'>
        <p className='text-xl my-1 text-black dark:text-white font-inter font-semibold'>
          ${balanceTotal} USD </p>
        <p className='text-xs text-black dark:text-white cursor-pointer font-inter'>Your total balance on {knownNetworks[currentNetwork].text} </p>
        <div className='absolute top-2 left-[120px] text-[10px] rounded-full py-[2px] px-[5px] border border-[#2EBE7B] font-roboto text-[#2EBE7B] flex items-center justify-center'>
          <p className='ml-1'>+DEMO%</p>
          <ArrowUpIcon className='rotate-45 w-3 h-3' />
        </div>
      </div>

      <div className='flex items-center justify-evenly mt-6 md:mt-10 lg:mt-12 lg:px-12 z-20'>
        <div className='flex items-center justify-center '
          onClick={() => dispatch(setOpen('homeSend'))} >
          <Button Icon={PaperAirplaneIcon}
            rotate={true}
            title='Send' />
        </div>
        <div className='flex items-center justify-center '
          onClick={() => dispatch(setOpen('homeReceive'))} >
          <Button Icon={DownloadIcon}
            title='Receive' />
        </div>

        {knownNetworks[currentNetwork]?.networkType === 'ethereum'
          ? <div className='flex items-center justify-center '
            onClick={() => dispatch(setOpen('homeAddToken'))} >
            <Button Icon={PlusSmIcon}
              title='Add Token' />
          </div>
          : null}

      </div>

      <div className='flex items-center justify-between mt-5 md:mt-10 md:h-16 px-5 z-20'>

        <div className='flex items-center justify-start xl:w-72' >
          <p className='hidden sm:inline-flex text-black text-xs font-poppins dark:text-gray-400'>Your Portfolio</p>
          {/* searchInputOpen
            ? null
            : <SearchIcon className=' text-gray-500 px-1 h-6 w-6 cursor-pointer'
              onClick={() => handleClick()} /> /*}

          {/* {searchInputOpen
            ?  */}
          {/* <div className={`hidden lg:inline-flex ml-1 mr-2 py-1 w-[150px] items-center rounded-[10px] bg-[#F5F5F5] ${searchInputOpen ? 'opacity-100' : 'opacity-0'}`}>
            <input
              className=' pl-5 text-xs text-gray-600 placeholder-gray-400 bg-transparent outline-none '
              onBlur={() => {
                setSearchInputOpen(false);
                setSearchInput('');
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search token'
              ref={ref}
              type='text'
              value={searchInput} />

          </div> */}
          {/* : <div className='hidden lg:inline-flex ml-1 mr-2 py-1 w-[150px] items-center rounded-[10px] '>
            </div>
          } */}
        </div>

        <div className='flex items-center '>
          <p className={`hidden md:inline-flex text-right text-xs ${!showDust ? 'text-black dark:text-white' : 'text-gray-400'}`}>Show all assets</p>

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
          <p className={`flex md:hidden text-xs  ${showDust ? 'text-black dark:text-white' : 'text-gray-400'}`}>Show all</p>

          <p className={`hidden md:inline-flex text-xs ${showDust ? 'text-black dark:text-white' : 'text-gray-400'}`}>Hide smaller assets</p>
        </div>

        <p className='hidden sm:inline-flex text-black dark:text-gray-400 justify-end xl:w-64 '>Total Balance</p>
      </div>

      <div className='flex flex-col scrollbar-thin min-h-[400px] h-full overflow-y-scroll z-20'>

        {searchInputOpen
          ? <div className='flex lg:hidden py-2 w-full items-center rounded-[10px] bg-[#F5F5F5]'>
            <input
              className=' pl-5 text-xs text-gray-600 placeholder-gray-400 bg-transparent outline-none '
              onBlur={() => {
                setSearchInputOpen(false);
                setSearchInput('');
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search token'
              type='text'
              value={searchInput} />

          </div>
          : <div className='flex lg:hidden py-2 w-full items-center rounded-[10px] '>
          </div>
        }

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

    </div >
  );
}

export default Balance;
