// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import Head from 'next/head';
import React from 'react';

import About from '../components/landingComponents/About';
import ContactMe from '../components/landingComponents/ContactMe';
import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';

const Home: NextPage = () => {
  // console.log('local1', localStorage.getItem('serialziedUserAccount'))

  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>

      <Header />
      <Hero />
      <About />
      {/* <Experience />
      <Skills />
      <Projects /> */}
      <ContactMe />
    </div>
  );
};

export default Home;
