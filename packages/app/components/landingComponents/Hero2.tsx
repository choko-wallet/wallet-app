// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Typed from 'react-typed';

import logo1 from '../../images/logo1.svg';
import logovideo from './landing.mp4';

import BackgroundCircle from './BackgroundCircle';

const Hero = (): JSX.Element => {
  const router = useRouter();
  const vidRef = useRef();

  useEffect(() => { vidRef.current.play(); }, []);

  return (
    <section className='snap-center relative'
      id='hero'>
      <div className='flex items-center justify-center h-screen space-y-8 overflow-hidden text-center '>
        {/* <BackgroundCircle /> */}

        <div className='z-20 flex flex-col items-center justify-center lg:pt-6 pb-5 md:pb-10 lg:pb-28'>

          <p className='py-6 text-[35px] lg:text-[50px] text-white font-vt323'>
            Your <Typed
              backSpeed={20}
              loop
              strings={[
                'easy to use',
                'secure',
                'multi-chain',
                'portable',
                'extensible']}
              typeSpeed={100} />crypto wallet
          </p>

          <p className='text-[20px] md:text-[28px] font-vt323 max-w-[800px] text-[#FFFFFE] pb-2 '>
            Trade, own and swap on your favorite blockchain with gasless transaction and account abstraction support.
          </p>

          <div className='flex flex-col lg:mt-6'>
            <button className='py-3 mt-3 text-xl text-[#0170BF] transition duration-150
                rounded-md hover:shadow-sm active:scale-90 w-40 md:w-48 mb-10 bg-[#F5CBD5]'
              onClick={() => router.push('/home')}>ENTER
            </button>

            <button className='py-3 text-xl text-white transition duration-150
                rounded-md hover:shadow-sm active:scale-90 w-40 md:w-48 mb-10 bg-[#0170BF]'
              onClick={() => router.push('/test-request')}>REQUEST
            </button>
          </div>






          {/* <a href={'#about'} className=''>
            <ArrowDownIcon className='h-8 text-[#888888] cursor-pointer ' />
          </a> */}

        </div>

        <video
          className='h-[500px] w-[600px] border border-gray-700 rounded-[25px]  shadow-xl shadow-black'
          autoPlay={true}
          loop
          ref={vidRef}
          muted
          src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FjfEBcXad1CpcUIWl79lI%2Fimage?alt=media&token=7417d517-acbc-4286-9e09-86586b1e40ee'
        // src='https://v16-webapp.tiktok.com/47607a44444a69b42d1ad551da9b8a61/63c56930/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oEmTEeQM7DSPPJdjAmQwUPI9buC6RBDPanSVve/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=7214&bt=3607&cs=0&ds=3&ft=4b~OyMli8Zmo0tN8864jVkAUPpWrKsdm&mime_type=video_mp4&qs=0&rc=ZmQ8aDNpM2ZoaDo2Ozs4OEBpM3RxdTw6ZjxtaDMzZjgzM0AzMF5fM18vNjUxMC9eMzZjYSNncGswcjRna3JgLS1kL2Nzcw%3D%3D&l=202301160911204794FAA6FE2B9D0A5ED0&btag=80000'
        />
      </div>







      <div className='absolute bottom-8 left-0 right-0 h-10 flex items-center justify-center '>
        <a className=''
          href={'#about'}>
          <ChevronDownIcon className='h-8 text-white cursor-pointer ' />
        </a>
      </div>
    </section>
  );
};

export default Hero;
