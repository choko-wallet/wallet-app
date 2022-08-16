// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { useTheme } from 'next-themes';

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

  return (<main className='grid grid-cols-12 gap-4 min-h-screen content-between'
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1623150502742-6a849aa94be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8)'
    }}>
    <Head><title>Choko Wallet</title></Head>
    <div className='col-span-12'></div>
    <div className='col-span-4 col-start-5 h-80 hero bg-base-100 shadow-xl rounded-xl'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-3xl font-bold'>Choko Wallet</h1>
          <p className='py-6'>Your ultimate cross-chain crypto wallet.</p><br/>

          <button className='btn'
            onClick={() => router.push('/account')}>Enter</button>
        </div>

      </div>
    </div>
    {/* <div className=' shadow-xl bg-white rounded-xl'>
      <div className='card card-side'>
        <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
        <h2 className='card-title'>
          Choko Wallet
        </h2><br/>
        <h3>Your ultimate cross-chain crypto wallet.</h3>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Listen</button>
      </div>
    </div> */}

    <div className='col-span-12'>
      {/* <Footer /> */}
    </div>
  </main>);
};

export default Home;
