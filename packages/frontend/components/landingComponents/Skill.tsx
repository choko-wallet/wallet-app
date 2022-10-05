// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Icon } from '@iconify/react';
import React from 'react';

type Props = {
  direction?: boolean;
  iconUrl: string;
  text: string;
};

const Skill = ({ direction, iconUrl, text }: Props) => {
  return (
    <div className='relative cursor-pointer'>
      <div
        // initial={{
        //   x: direction ? 200 : -200,
        //   opacity: 0,
        // }}
        // transition={{
        //   duration: 1.5,
        // }}
        // whileInView={{
        //   x: 0,
        //   opacity: 1,
        // }}
        // viewport={{
        //   once: false,
        // }}
        className=''
      >

        <Icon
          className='w-24 h-24 p-3 border border-gray-500 rounded-full md:w-28 md:h-28 '
          icon={iconUrl}
        />
        {/* <div className='relative w-24 h-24 p-3 border border-gray-500 rounded-full md:w-28 md:h-28 '>
          <Image
            className='relative object-cover mx-auto rounded-full'
            src='https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png
          '
            // alt='choko wallet'
            // width={180}
            // height={180}
            layout='fill'
          />
          </div> */}
        {/* https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png */}
        <div className='absolute top-0 w-24 h-24 transition duration-300 ease-in-out rounded-full opacity-0 hover:opacity-80 hover:bg-white md:w-28 md:h-28 '>
          <div className='flex items-center justify-center h-full'>
            <p className="text-lg font-bold text-black font-['Dosis']">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
