// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

import { DuplicateIcon, RefreshIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

function ShowPassphrase (): JSX.Element {
  const router = useRouter();
  const [seeds, setSeeds] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setSeeds('token token token token token token token token token token token token');
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
          <div className='absolute flex flex-col items-center justify-center w-full space-y-4 text-center top-16'>
            <p className='text-2xl font-bold '>Show Passphrase</p>
            <p className='text-sm '>Please Input Your Password</p>

            <input className='w-full max-w-xs input input-bordered input-info'
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type here'
              type='text'
              value={input} />

            {/* <button onClick={() => router.push('/home')} className="px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 " >Change Password</button> */}
            {/* <button onClick={() => router.push('/home')} className="px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 "  >Cancel</button> */}

            <button className={`px-10 py-3 my-3 font-bold rounded-full w-60 bg-gray-300 ${input && 'text-purple-800 transition duration-150 !bg-white shadow-md hover:shadow-xl active:scale-90'}`}
              disabled={!input}
              onClick={() => setShow(true)}
            >
              Verify & Complete
            </button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Cancel</button>

            {show
              ? <>
                <div className='border border-blue-400 rounded-lg '>
                  <div className='grid grid-cols-4 '>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>1. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>2. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>3. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>4. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>5. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>6. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>7. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>8. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>9. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>10. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>11. token</p>
                    <p className='w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md'>12. token</p>

                  </div>
                  <div className='grid grid-cols-2 py-4' >

                    <CopyToClipboard onCopy={() => setCopied(true)}
                      text={seeds}>
                      <p className='flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'>
                        <DuplicateIcon className='h-5 px-3 cursor-pointer' />Copy</p>
                    </CopyToClipboard>

                    <p className='flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'>
                      <RefreshIcon className='h-5 px-3 cursor-pointer ' />Generate New</p>
                    {copied ? <span className='h-2 text-xs text-blue-500 ' >Copied</span> : <div className='h-2 '></div>}
                  </div>
                </div>
              </>
              : null}

          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default ShowPassphrase;
