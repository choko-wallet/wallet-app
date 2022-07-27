// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function ImportAccount (): JSX.Element {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
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
        <div className='relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] '>
          {theme === 'light'
            ? <Image
              layout='fill'
              objectFit='contain'
              src={bg}
            />
            : null}
          <div className='absolute flex flex-col items-center justify-center w-full text-center top-5'>
            <p className='text-2xl font-bold '>Recover using Passphrase</p>
            <p className='max-w-3xl py-6 text-sm font-bold'>Enter the backup passphrase associated with the account.</p>
            <p className='text-lg font-bold '>Passphrase (12 words)</p>

            {/* <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none "
                type="text"
              />
            </div> */}

            <div className='h-16 p-3 mt-1 w-30 md:w-48 lg:w-64 md:shadow-sm'>
              <input
                className='w-full h-10 pl-2 rounded-md border-3 border-gray bg-gray-50 sm:text-sm '
                onChange={(e) => setInput(e.target.value)}
                type='text'
                value={input}
              />

            </div>
            {/*
            className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
            {!session ? "Sign in to Checkout" : "Proceed to Checkout"} */}

            <button className={`px-10 py-3 my-3 font-bold rounded-full w-60 bg-gray-300 ${input && 'text-purple-800 transition duration-150 !bg-white shadow-md hover:shadow-xl active:scale-90'}`}
              disabled={!input}
              onClick={() => router.push('/home')}
            >
              Verify & Complete
            </button>
            <button className='px-10 py-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 bg-gradient-to-r from-yellow-200 to-blue-200 '
              onClick={() => router.push('/')} >Cancel</button>
          </div>
        </div >
      </main >

      <Footer />

    </div>
  );
}

export default ImportAccount;
