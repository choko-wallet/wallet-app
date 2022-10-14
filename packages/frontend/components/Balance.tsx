// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DownloadIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import React from 'react';

import Button from './Button';
import CryptoRow from './CryptoRow';

interface Crypto {
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: string;
  estimatedTime: string;
  arrival: string;
  MinDeposit: string;
}

interface Props {
  currentNetworkName: string;
  cryptoInfo: Crypto[];
  setIsSendOpen: (value: boolean) => void;
  setIsReceiveOpen: (value: boolean) => void;
}

function Balance({ cryptoInfo, currentNetworkName, setIsReceiveOpen, setIsSendOpen }: Props): JSX.Element {
  return (
    <div className='relative flex flex-col bg-white dark:bg-[#2A2E37] flex-grow rounded-[30px] '>
      <div className='bg-[#F5F5F5] w-[300px] h-[100px] lg:w-[500px] dark:bg-[#353B4D] rounded-lg m-5 md:m-10 lg:ml-16 p-3 px-5'>
        <p className='text-2xl my-1 text-black dark:text-white font-poppins font-semibold'> $793.32 USD </p>
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
        <p className='text-black dark:text-gray-400'>Your Portfolio</p>
        <p className='text-black dark:text-gray-400'>Total Balance</p>
      </div>

      <div className='flex flex-col scrollbar-thin min-h-[400px] h-full overflow-y-scroll m-5 mt-0'>

        {cryptoInfo.map((item) => (
          <CryptoRow img={item.img}
            key={item.img}
            name={item.name}
            price={item.price}
            shortName={item.shortName} />
        ))}

      </div>

    </div >
  );
}

export default Balance;
