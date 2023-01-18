// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import React from 'react';

import About from '../components/landingComponents/About';
import About2 from '../components/landingComponents/About2';
import About3 from '../components/landingComponents/About3';
import About4 from '../components/landingComponents/About4';


import ContactMe from '../components/landingComponents/ContactMe';
import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';
import Hero2 from '../components/landingComponents/Hero2';


const Home: NextPage = () => {
  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>
      {/* <About4 /> */}

      <Header />
      <Hero />
      {/* <Hero2 /> */}

      <ContactMe />
      {/* <About />
      <About2 />
      <About3 /> */}


    </div>
  );
};

export default Home;
