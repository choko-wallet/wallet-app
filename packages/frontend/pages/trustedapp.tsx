// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LocationMarkerIcon } from '@heroicons/react/outline';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function ConnectApp (): JSX.Element {
  // const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Header />
      <main>
        <div className='relative h-[600px] sm:h-[700px] lg:h-[800px] '>
          {theme === 'light'
            ? <Image
              layout='fill'
              objectFit='contain'
              src={bg}
            />
            : null}
          <div className='absolute flex flex-col items-center justify-center w-full text-center top-16'>
            <p className='text-2xl font-bold '>Trusted App</p>
            {/* <p className="py-6 text-sm sm:text-lg ">An application is requesting limited access to your Choko Wallet account.</p> */}

            <div className='justify-between h-16 gap-2 px-8 mt-5 badge badge-info w-60'>
              <div className='flex items-center justify-center' >
                <LocationMarkerIcon className='h-8 text-gray' />
                <p>Google</p>
              </div>
              <button className='btn btn-circle btn-outline'>
                <svg className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'><path d='M6 18L18 6M6 6l12 12'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2' /></svg>
              </button>
            </div>

          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default ConnectApp;
