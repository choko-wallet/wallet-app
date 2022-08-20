// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import Typed from 'react-typed';
// import { useTheme } from 'next-themes';
import logo from '../images/logo.svg';

const Home: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // backgroundImage: 'url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80)'

  return (<main className='grid grid-cols-12 gap-4 min-h-screen content-center color-bg'>
    <Head><title>Choko Wallet</title></Head>

    <div className='col-span-10 col-start-2 min-h-[60vh] text-white'>
      <div className='md:p-10'>
          {/* <h1 className='text-3xl font-bold'>Choko Wallet</h1> */}
          <Image
            className='relative w-10 m-0'
            // layout='fill'
            objectFit='fill'
            src={logo}
          />

          <p className='py-6 text-2xl text-black font-mono'>
            Your <Typed
              strings={[
                'easy to use',
                'secure',
                'multi-chain',
                'portable',
                'extensible']}
              typeSpeed={100}
              backSpeed={20}
              loop />crypto wallet
            </p><br/>

          <button className='btn w-[70%] md:w-[15%] mb-10'
            onClick={() => router.push('/home')}>Enter
          </button>
          
          <div className='flex'>
            {/* <span className='text-xl'>Follow us:</span> */}
            {[
                [faGithub, 'http://github.com/choko-wallet'],
                [faMedium, 'http://github.com/choko-wallet'],
                [faTwitter, 'http://github.com/choko-wallet'],
                [faDiscord, 'http://github.com/choko-wallet'],
              ].map(([icon, url]) => (
                <div className='m-1'>
                  <button className='btn btn-circle' onClick={() =>
                    window.open(url, '_blank')
                  }>
                    <FontAwesomeIcon className='h-6' icon={icon} />
                  </button>
                </div>
              ))
            }
          </div>
      </div>
    </div>
  </main>);
};

export default Home;
