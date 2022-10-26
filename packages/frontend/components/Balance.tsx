// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DownloadIcon, PaperAirplaneIcon, PlusSmIcon, SearchCircleIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react'
import Button from './Button';
import CryptoRow from './CryptoRow';

interface Crypto {
  balance: number,
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: number;
  estimatedTime: string;
  arrival: string;
  minDeposit: number;
}

interface Props {
  balance: number;
  currentNetworkName: string;
  cryptoInfo: Crypto[];
  setIsSendOpen: (value: boolean) => void;
  setIsReceiveOpen: (value: boolean) => void;
  setAddTokenModalOpen: (value: boolean) => void;

}

function Balance({ balance, cryptoInfo,
  currentNetworkName, setAddTokenModalOpen, setIsReceiveOpen, setIsSendOpen }: Props): JSX.Element {
  const [balanceTotal, setBalanceTotal] = useState<string>('0');
  const [enabled, setEnabled] = useState<boolean>(false)
  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false)


  useEffect(() => {
    let balance = 0;
    for (let i = 0; i < cryptoInfo.length; i++) {
      balance += cryptoInfo[i].balance * cryptoInfo[i].price;
    }
    console.log('cryptoInfo-balance', balance)
    setBalanceTotal(Number(balance).toLocaleString(undefined, { maximumFractionDigits: 2 }))

  }, [cryptoInfo])

  // console.log('cryptoInfo-balance', cryptoInfo)
  return (
    <div className='relative flex flex-col bg-white dark:bg-[#2A2E37] flex-grow rounded-[30px] '>
      <div className='bg-[#F5F5F5] w-[300px] h-[100px] lg:w-[500px] dark:bg-[#353B4D] rounded-lg m-5 md:m-10 lg:ml-16 p-3 px-5'>
        <p className='text-2xl my-1 text-black dark:text-white font-poppins font-semibold'>
          ${balanceTotal} USD </p>
        {/* 这个位置多种币的话 需要for循环加一起  */}
        <p className='text-sm text-black dark:text-white cursor-pointer font-poppins'>Your total balance on {currentNetworkName} </p>
      </div>

      <div className='flex items-center justify-evenly '>
        <div className='flex items-center justify-center '
          onClick={() => setIsSendOpen(true)} >
          <Button Icon={PaperAirplaneIcon}
            rotate={true}
            title='Send' />
        </div>
        <div className='flex items-center justify-center '
          onClick={() => setIsReceiveOpen(true)}>
          <Button Icon={DownloadIcon}
            title='Receive' />
        </div>
      </div>

      <div className='flex items-center justify-between  pt-5 px-16'>

        <div className='cursor-pointer mx-auto rounded-lg my-3 w-[180px] h-[100px] border-2 border-[#4798B3] border-dashed'
          onClick={() => setAddTokenModalOpen(true)}>
          <div className='mx-auto flex relative items-center w-[70px] h-[70px] my-auto  cursor-pointer justify-center'
          >

            <div className='h-[40px] w-[40px] rounded-full bg-[#C67391] my-auto flex relative items-center justify-center'>
              <PlusSmIcon className=' text-white z-50 h-6 w-6 ' />


            </div>
            <p className='absolute top-[60px] whitespace-nowrap text-lg font-semibold font-poppins text-black dark:text-white'>Add ERC20 Token</p>
          </div>

        </div>

        <SearchCircleIcon className=' text-black z-50 h-12 w-12 cursor-pointer'
          onClick={() => setSearchInputOpen(!searchInputOpen)} />

        <div className="py-16">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <p className='text-black dark:text-gray-400'>hide small assets</p>
        </div>

      </div>


      <div className='flex items-center justify-between  pt-5 px-16'>
        <p className='text-black dark:text-gray-400'>Your Portfolio</p>
        <p className='text-black dark:text-gray-400'>Total Balance</p>
      </div>

      <div className='flex flex-col scrollbar-thin min-h-[400px] h-full overflow-y-scroll m-5 mt-0'>

        {searchInputOpen ?
          <input className='input border border-[#c67391] w-full '
            placeholder='token'
            type='text'
          />
          : null}

        {cryptoInfo.map((item) => (
          <CryptoRow
            balance={item.balance}
            img={item.img}
            key={item.img}
            name={item.name}
            price={item.price}
            shortName={item.shortName}
          />
        ))}

      </div>

    </div >
  );
}

export default Balance;
