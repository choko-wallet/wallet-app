// [object Object]
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function Create () {
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
        <div className='relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] '>
          {theme === 'light'
            ? <Image
              layout='fill'
              objectFit='contain'
              src={bg}
            />
            : null}
          <div className='absolute flex flex-col items-center justify-center w-full text-center top-1/4'>
            <p className='text-2xl font-bold '>Create Account</p>
            <p className='py-6 text-sm sm:text-lg '>Generate and safely store a unique passphrase.</p>
            <button className='px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md animate-pulse bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/showpass')} >Secure Passphrase</button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/')} >Cancel</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Create;
