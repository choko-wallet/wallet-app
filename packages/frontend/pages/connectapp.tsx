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
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showpass, setShowpass] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setAccountNumber('222222222222222222222');
  }, []);

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
            <p className='text-2xl font-bold '>Connect App</p>
            <p className='py-6 text-sm sm:text-lg '>An application is requesting limited access to your Choko Wallet account.</p>

            <div className='badge badge-info gap-2 h-12 w-40'>
              <LocationMarkerIcon className='h-8 text-gray' />
              Google
            </div>
            <div className='h-10 w-10 pt-5'>
              <ChevronDoubleDownIcon className='h-8 text-gray-600' />
            </div>

            <div className='card mt-10 w-96 bg-blue-200 text-neutral-content'>
              <div className='card-body items-center text-center'>
                <h2 className='card-title text-gray-600'>Your Account</h2>
                <p className='flex items-center justify-center h-10 text-gray-600'>
                  222222
                  {!showpass
                    ? <>
                      <DotsHorizontalIcon className='h-8 text-gray-600' />
                      <DotsHorizontalIcon className='h-8 text-gray-600' />
                      <DotsHorizontalIcon className='h-8 text-gray-600' />
                    </>
                    : <span>222222222</span>}
                  2222</p>
                <div className='card-actions justify-end'>
                  <div className='grid grid-cols-2 py-4' >

                    <CopyToClipboard onCopy={() => setCopied(true)}
                      text={accountNumber}>
                      <p className='flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'>
                        <DuplicateIcon className='h-5 px-3 cursor-pointer' /></p>
                    </CopyToClipboard>

                    <p className='flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'
                      onClick={() => setShowpass(!showpass)}>
                      {showpass ? <EyeIcon className='h-5 px-3 cursor-pointer ' /> : <EyeOffIcon className='h-5 px-3 cursor-pointer ' />}
                    </p>

                    {copied ? <span className='h-2 text-xs text-blue-500 ' >Copied</span> : <div className='h-2 '></div>}

                  </div>
                </div>
              </div>
            </div>

            <button className='px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Approve</button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Cancel</button>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default ConnectApp;
