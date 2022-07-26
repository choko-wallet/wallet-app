// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { ChevronDoubleDownIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon, LocationMarkerIcon, RefreshIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function ConnectApp () {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

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

            <div className='badge badge-info gap-2 h-16 w-60 justify-between px-8 mt-5'>
              <div className='flex items-center justify-center' >
                <LocationMarkerIcon className='h-8 text-gray' />
                <p>Google</p>
              </div>
              <button className='btn btn-circle btn-outline'>
                <svg className='h-6 w-6'
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
