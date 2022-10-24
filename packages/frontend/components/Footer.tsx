// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useTheme } from 'next-themes';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import discIcon1 from '../images/discord1.svg';
import discIcon2 from '../images/discord2.svg';

function Footer(): JSX.Element {
  const { theme } = useTheme();

  return (
    // <div className='fixed left-0 right-0 bottom-0 backdrop-blur-lg z-20 flex justify-between items-center p-3 md:px-10 '>
    <div className='flex justify-between items-center p-3 pt-5 md:px-10 '>
      <p className='text-black dark:text-white font-poppins text-md'>© 2022 Choko Wallet</p>
      {theme === 'light'
        ? <div className='flex items-center justify-center'>
          <a className='relative h-7 w-7 m-3'
            href={'https://discord.gg/zkp8UEQctM'}
            rel='noreferrer'
            target='_blank'>
            <Image
              layout='fill'
              objectFit='contain'

              /* eslint-disable */
              // @ts-ignore
              src={discIcon1}
            /* eslint-enable */
            />
          </a>
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
            url='https://t.me/choko_wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            target='_blank'
            url='https://twitter.com/choko_wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='black'
            target='_blank'
            url='https://medium.com/@choko_wallet'
          />
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='black'
            network='email'
            url='mailto:contact@choko.app'
          />
        </div>
        : <div className='flex items-center justify-center'>
          <a className='relative h-7 w-7 m-3'
            href={'https://discord.gg/zkp8UEQctM'}
            rel='noreferrer'
            target='_blank'>
            <Image
              layout='fill'
              objectFit='contain'

              /* eslint-disable */
              // @ts-ignore
              src={discIcon2}
            /* eslint-enable */
            />
          </a>
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
            url='https://t.me/choko_wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            target='_blank'
            url='https://twitter.com/choko_wallet'
          />
          <SocialIcon
            bgColor='transparent'
            fgColor='white'
            target='_blank'
            url='https://medium.com/@choko_wallet'
          />

          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='white'
            network='email'
            url='mailto:contact@choko.app'
          />
        </div>}

    </div>
  );
}

export default Footer;
