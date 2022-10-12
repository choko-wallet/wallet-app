// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

import discIcon2 from '../../images/discord2.svg';

const ContactMe = (): JSX.Element => {
  return (
    <section className='snap-start'
      id='contact'>
      <div className='relative flex items-center justify-center h-screen text-center'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Contact
        </h3>

        <div className='flex flex-col space-y-10'>

          <h4 className='text-4xl font-semibold text-center md:text-5xl'>
            Let&apos;s{' '}
            <span className='underline decoration-[#F7AB0A]/50'>Talk!</span>
          </h4>
          <div className='flex items-center justify-center space-x-4'>

            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              network='email'
            />

            <p className='text-2xl'>contact@choko.app</p>

          </div>

          <div className='flex items-center justify-center'>
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              target='_blank'
              url='https://github.com/choko-wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              target='_blank'
              url='https://t.me/choko_wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              target='_blank'
              url='https://twitter.com/choko_wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              target='_blank'
              url='https://medium.com/@choko_wallet'
            />

            <a className='cursor-pointer inline-flex relative h-7 w-7 m-3'
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

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMe;
