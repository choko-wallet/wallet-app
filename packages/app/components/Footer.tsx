// Copyright 2021-2022 @choko-wallet/footer-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import Image from 'next/image';
import { useTheme } from 'next-themes';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

import discIcon1 from '../images/discord1.svg';
import discIcon2 from '../images/discord2.svg';

function Footer(): JSX.Element {
  const { theme } = useTheme();

  return (
    // <div className='fixed left-0 right-0 bottom-0 backdrop-blur-lg z-20 flex justify-between items-center p-3 md:px-10 '>
    <div className='flex justify-between items-center md:px-10  mx-[10px] '>
      <p className='text-black dark:text-white font-poppins text-[15px] ml-2'>© 2022 Choko Wallet</p>



      {theme === 'light'
        ? <div className='flex items-center justify-center'>
          <a className='relative  mx-[6px]'
            href={'https://discord.gg/zkp8UEQctM'}
            rel='noreferrer'
            target='_blank'>

            <img alt='discord'
              className='object-contain w-[15px] h-[15px] rounded-lg'
              src={discIcon1.src} />
          </a>
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://github.com/choko-wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://t.me/choko_wallet'

          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://twitter.com/choko_wallet'

          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://medium.com/@choko_wallet'

          />
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='black'
            network='email'
            style={{ height: 26, width: 28 }}
            url='mailto:contact@choko.app'

          />
        </div>
        : <div className='flex items-center justify-center'>
          <a className='relative  mx-[6px]'
            href={'https://discord.gg/zkp8UEQctM'}
            rel='noreferrer'
            target='_blank'>

            <img alt='discord'
              className='object-contain w-[15px] h-[15px] rounded-lg'
              src={discIcon2.src} />
          </a>
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://github.com/choko-wallet'

          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://t.me/choko_wallet'

          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            style={{ height: 26, width: 28 }}
            target='_blank'
            url='https://twitter.com/choko_wallet'

          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            style={{ height: 28, width: 28 }}
            target='_blank'
            url='https://medium.com/@choko_wallet'

          />

          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='white'
            network='email'
            style={{ height: 32, width: 32 }}
            url='mailto:contact@choko.app'

          />
        </div>}

    </div>
  );
}

export default Footer;
