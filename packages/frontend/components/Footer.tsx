// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { useTheme } from 'next-themes';
import discIcon1 from '../images/discord1.svg'
import discIcon2 from '../images/discord2.svg'
import Image from 'next/image';


function Footer(): JSX.Element {
  const { theme, setTheme } = useTheme();


  return (
    <div className='flex justify-between items-center p-3 md:px-10' >
      <p className='text-black dark:text-white font-poppins text-md'>© 2022 Choko Wallet</p>
      {theme == 'light' ?
        <div className='flex items-center justify-center'>
          <div className='relative h-7 w-7 m-3'>
            <Image
              layout='fill'
              objectFit='contain'
              src={discIcon1}
            />
          </div>
          <SocialIcon
            url='https://github.com/choko-wallet'
            fgColor='black'
            bgColor='transparent'
            target='_blank'
          />
          <SocialIcon
            url='https://telegram'
            fgColor='black'
            bgColor='transparent'
            target='_blank'
          />

          <SocialIcon
            url='https://twitter'
            fgColor='black'
            bgColor='transparent'
            target='_blank'
          />
          <SocialIcon
            className='cursor-pointer'
            network='email'
            fgColor='black'
            bgColor='transparent'
          />
        </div> :
        <div className='flex items-center justify-center'>
          <div className='relative h-7 w-7 m-3'>
            <Image
              layout='fill'
              objectFit='contain'
              src={discIcon2}
            />
          </div>
          <SocialIcon
            url='https://github.com/choko-wallet'
            fgColor='white'
            bgColor='transparent'
            target='_blank'
          />
          <SocialIcon
            url='https://telegram'
            fgColor='white'
            bgColor='transparent'
            target='_blank'
          />
          <SocialIcon
            url='https://twitter'
            fgColor='white'
            bgColor='transparent'
            target='_blank'
          />
          <SocialIcon
            className='cursor-pointer'
            network='email'
            fgColor='white'
            bgColor='transparent'
          />

        </div>}


    </div>
  );
}

export default Footer;
