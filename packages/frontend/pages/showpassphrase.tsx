// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import bg from '../images/bg.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { savePassword } from '../features/slices/userSlice';
import { selectError } from '../features/redux/selectors';

function ShowPassphrase (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [input, setInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if(error) {
      setErrorMsg('Invalid Password');
    }
  }, [error])

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
              onChange={(e) => {
                setErrorMsg('');
                setInput(e.target.value)
              }}
              placeholder='Type here'
              type='text'
              value={input} />
            {errorMsg && <p className='text-sm text-red-800'>
                {errorMsg}
              </p>
            }

            <button className={`px-10 py-3 my-3 font-bold rounded-full w-60 bg-gray-300 ${input && 'text-purple-800 transition duration-150 !bg-white shadow-md hover:shadow-xl active:scale-90'}`}
              disabled={!input}
              onClick={() => {
                dispatch(savePassword(input))
                router.push('/home')
              }}
            >
              Verify & Complete
            </button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Cancel</button>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default ShowPassphrase;
