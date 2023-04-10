// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface Props {
  name: string;
  price: number;
  change: number;
  img: string;
}

function PriceRow ({ change, img, name, price }: Props): JSX.Element {
  return (
    <div className='flex items-center  text-[12px] py-3 px-3 bg-black border-b border-gray-700 hover:bg-gray-700/90 hover:text-purple-300 cursor-pointer'>
      <div className='flex'>
        <img alt='icon'
          className='w-5 h-5 object-contain mr-1'
          src={img} />
        <p className='w-10'>{name}</p>
      </div>
      <p className='flex-1 flex items-center justify-center'>${price}</p>
      <p className='w-10 text-right text-green-600'>+{change}%</p>
    </div>
  );
}

export default PriceRow;
