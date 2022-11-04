// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect } from 'react';

interface Props {
  balance: number;
  name: string;
  img: string;
  price: number;
  symbol: string;

}

function CryptoRow({ balance, img, name, price, symbol }: Props): JSX.Element {



  return (
    <div className=' w-full text-right p-1 '>
      <div className='flex flex-row p-3 rounded-lg bg-[#F6F6F6] dark:bg-[#384855] dark:hover:bg-[#4797B5]  hover:bg-[#4797B5]'>
        <div className='flex justify-between flex-grow'>
          <div className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-transparent dark:bg-gray-700'>
            {img !== null
              ?
              <img alt='icon'
                className='w-[70%] h-[70%] object-contain'
                src={img}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'
                }}
              />
              :
              <img alt='icon'
                className='w-[70%] h-[70%] object-contain'
                src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'
                }}
              />
            }



          </div>
          <div className='flex flex-col flex-1 ml-3'>
            <p className='w-full max-w-64 truncate flex flex-grow font-semibold text-black dark:text-white text-[22px]  font-poppins'>
              {name}
            </p>
            {price === undefined
              ?
              <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[14px]  font-poppins'>
                {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
                0{' '}USD
              </p>
              :
              <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[14px]  font-poppins'>
                {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
                {price}
                {' '}USD
              </p>
            }


          </div>
        </div>
        <div className=' flex flex-col justify-between '>
          <p className='font-semibold text-black dark:text-white flex flex-grow text-[18px] mt-2 font-poppins justify-end'>
            {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            {/* 可试下不定四位 能否正常显示  */}
            {'  '}{symbol}

          </p>

          {price === undefined
            ?
            <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[14px]  font-poppins'>
              {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
              0{' '}USD
            </p>
            :
            <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[14px]  font-poppins'>
              {Number(balance * price).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
            </p>
          }


        </div>
      </div>
    </div>
  );
}

export default CryptoRow;
