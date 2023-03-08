// Copyright 2021-2022 @choko-wallet/balance-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

/**
 * Render each row of crypto in protfolio
 */

interface Props {
  balance: number;
  name: string;
  img: string;
  price: number;
  symbol: string;
}

function BalanceRow ({ balance, img, name, price, symbol }: Props): JSX.Element {
  return (
    <div className=' w-full text-right p-1 '>
      <div className='flex flex-row sm:p-3 rounded-[4px] bg-[#F6F6F6] dark:bg-[#384855] dark:hover:bg-[#0170BF]  hover:bg-[#0170BF] group'>
        <div className='flex justify-between flex-grow'>
          <div className='w-[25px] h-[65px] mx-[15px] sm:w-[64px] sm:h-[64px] rounded-full flex justify-center items-center bg-transparent '>
            {img !== null
              ? <img alt='icon'
                className='object-contain'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png';
                }}
                src={img}
              />
              : <img alt='icon'
                className='object-contain'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png';
                }}
                src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/gold.png'}
              />
            }
          </div>

          <div className='flex flex-col flex-1 py-[10px] sm:ml-3 sm:pt-0 '>
            <p className='text-left w-full h-full max-w-64 text-ellipsis flex flex-grow font-semibold text-black dark:text-white text-[15px] sm:text-[22px]  font-poppins group-hover:text-[#F5CBD5] '>
              {name}
            </p>
            {price === undefined
              ? <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[10px]  font-poppins group-hover:text-[#F5CBD5]'>
                {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
                0{' '}USD
              </p>
              : <p className='text-left font-normal text-gray-700 dark:text-gray-300 text-[10px]  font-poppins group-hover:text-[#F5CBD5]'>
                {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
                {price}
                {' '}USD
              </p>
            }
          </div>
        </div>

        <div className=' flex flex-col justify-between p-[10px] '>
          <p className='h-full font-semibold text-black dark:text-white flex flex-grow text-[20px] sm:text-[14px] mt-1 mb-1 font-poppins justify-end group-hover:text-[#F5CBD5] '>
            {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            {'  '}{symbol}

          </p>

          {price === undefined
            ? <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[10px]  font-poppins group-hover:text-[#F5CBD5]'>
              {/* {Number(price).toLocaleString(undefined, { maximumFractionDigits: 10 })} */}
              0{' '}USD
            </p>
            : <p className=' font-normal  text-gray-700 dark:text-gray-300  text-[10px]  font-poppins group-hover:text-[#F5CBD5]'>
              {Number(balance * price).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
            </p>
          }
        </div>

      </div>
    </div>
  );
}

export default BalanceRow;
