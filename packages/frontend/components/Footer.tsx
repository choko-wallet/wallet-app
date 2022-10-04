// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useTheme } from 'next-themes';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

import discIcon1 from '../images/discord1.svg';
import discIcon2 from '../images/discord2.svg';

function Footer (): JSX.Element {
  const { setTheme, theme } = useTheme();

  return (
    <div className='flex justify-between items-center p-3 md:px-10' >
      <p className='text-black dark:text-white font-poppins text-md'>© 2022 Choko Wallet</p>
      {theme == 'light'
        ? <div className='flex items-center justify-center'>
          <div className='relative h-7 w-7 m-3'>
            <Image
              layout='fill'
              objectFit='contain'
              src={discIcon1}
            />
          </div>
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            target='_blank'
            url='https://github.com/choko-wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            target='_blank'
            url='https://telegram'
          />

          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            target='_blank'
            url='https://twitter'
          />
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='black'
            network='email'
          />
        </div>
        : <div className='flex items-center justify-center'>
          <div className='relative h-7 w-7 m-3'>
            <Image
              layout='fill'
              objectFit='contain'
              src={discIcon2}
            />
          </div>
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            target='_blank'
            url='https://github.com/choko-wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            target='_blank'
            url='https://telegram'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            target='_blank'
            url='https://twitter'
          />
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='white'
            network='email'
          />

        </div>}

    </div>
  );
}

export default Footer;
