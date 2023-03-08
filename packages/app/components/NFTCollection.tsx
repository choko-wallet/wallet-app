// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import nft7 from '../images/nft7.png';

function NFTCollection () {
  return (
    <div className=' rounded-lg flex flex-col items-center justify-between w-[108px] md:w-[118px] m-3 p-2 md:p-3'>
      <div className='flex '>
        <img
          alt='nft_image'
          className='object-cover w-full h-full rounded-lg'
          src={nft7.src}
        />
      </div>

      <div className='flex items-start justify-between  w-full mt-2'>
        <div>
          <p className='text-[10px] font-semibold text-white'>Floor</p>
          <p className='text-[10px] text-white'>1.1ETH</p>
        </div>
        <div>
          <p className='text-[10px] font-semibold text-right text-white'>
            Meme
          </p>
        </div>
      </div>
    </div>
  );
}

export default NFTCollection;
