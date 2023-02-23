// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import React from 'react';

import ContactMe from '../components/landingComponents/ContactMe';
import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';
import NFT from '../components/landingComponents/NFT';


const Home: NextPage = () => {
  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>

      <Header />
      <Hero />
      <NFT />
      <ContactMe />

    </div>
  );
};

export default Home;
