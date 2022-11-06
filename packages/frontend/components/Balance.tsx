// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BalanceInfo } from '../utils/types';

import { Switch } from '@headlessui/react';
import { DownloadIcon, PaperAirplaneIcon, SearchCircleIcon, SearchIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentNetwork, selectKnownNetworks } from '../features/redux/selectors';
import { setOpen } from '../features/slices/status';
import BalanceRow from './BalanceRow';
import Button from './Button';

interface Props {
  balance: BalanceInfo;
}

function Balance ({ balance }: Props): JSX.Element {
  const dispatch = useDispatch();

  const knownNetworks = useSelector(selectKnownNetworks);
  const currentNetwork = useSelector(selectCurrentNetwork);

  const [balanceTotal, setBalanceTotal] = useState<string>('0');
  const [showDust, setShowDust] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);
  const [filtedBalance, setFiltedBalance] = useState<BalanceInfo>(balance);

  useEffect(() => {
    console.log(balance);
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

  return (<div className='relative flex flex-col bg-white dark:bg-[#2A2E37] flex-grow rounded-[30px] '>
    <div className='bg-[#F5F5F5] w-[300px] h-[100px] lg:w-[500px] dark:bg-[#353B4D] rounded-lg m-5 md:m-10 lg:ml-16 p-3 px-5'>
      <p className='text-2xl my-1 text-black dark:text-white font-poppins font-semibold'>
          ${balanceTotal} USD </p>
      <p className='text-sm text-black dark:text-white cursor-pointer font-poppins'>Your total balance on {knownNetworks[currentNetwork].text} </p>
    </div>

    <div className='flex items-center justify-evenly '>
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

      {/* {knownNetworks[currentNetwork]?.networkType === 'ethereum' ?
          <div className='flex items-center justify-center '
            onClick={() => dispatch(setOpen('homeAddToken'))} >
            <Button Icon={PlusSmIcon}
              title='Add Token' />
          </div>
          :
          null} */}

    </div>
    <div className='flex items-center justify-between  pt-5 px-16'>
      <p className='text-black dark:text-gray-400'>Your Portfolio</p>

      <SearchCircleIcon className=' text-black h-10 w-10 cursor-pointer'
        onClick={() => setSearchInputOpen(!searchInputOpen)} />

      <div className='flex items-center '>
        <Switch
          checked={showDust}
          className={`${showDust ? 'bg-green-400' : 'bg-gray-400'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          onChange={setShowDust}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${showDust ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <p className='text-black dark:text-gray-400'>small assets</p>
      </div>
      <p className='text-black dark:text-gray-400'>Total Balance</p>
    </div>

    <div className='flex flex-col scrollbar-thin min-h-[400px] h-full overflow-y-scroll m-5 mt-0'>

      {searchInputOpen
        ? <div className='flex py-1  items-center rounded-md border border-gray-600'>
          <input
            className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none '
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search for Coin'
            type='text'
            value={searchInput} />
          <SearchIcon className='hidden h-8 p-2 text-white bg-gray-500 rounded-full cursor-pointer md:inline md:mx-2' />
        </div>
        : null}

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
