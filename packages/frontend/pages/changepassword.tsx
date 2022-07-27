// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function ChangePassword (): JSX.Element {
  const router = useRouter();
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
          <div className='absolute flex flex-col items-center justify-center w-full space-y-4 text-center top-16'>
            <p className='text-2xl font-bold '>Change Password</p>
            <p className='text-sm '>Old Password</p>

            <input className='w-full max-w-xs input input-bordered input-info'
              placeholder='Type here'
              type='text' />
            <p className='text-sm '>New Password</p>

            <input className='w-full max-w-xs input input-bordered input-info'
              placeholder='Type here'
              type='text' />

            <input className='w-full max-w-xs input input-bordered input-info'
              placeholder='Type here'
              type='text' />

            <button className='px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Change Password</button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Cancel</button>

          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default ChangePassword;
