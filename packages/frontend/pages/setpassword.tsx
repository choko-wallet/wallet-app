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
import { selectSeeds } from '../features/redux/selectors';
import { serializeUserAccount, savePassword } from '../features/slices/userSlice';

function SetPassword (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const seeds = useSelector(selectSeeds);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const handleSetPassword = () => {
    if(password1 == password2) {
      dispatch(savePassword(password1));
      dispatch(serializeUserAccount({seeds: seeds, password: password1}));
      router.push('/home');
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if(!seeds) {
      router.push('/showpass');
    }
  }, [])

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
            <p className='text-2xl font-bold '>Set Password</p>

            <input 
              className='w-full max-w-xs input input-bordered input-info'
              placeholder='Type here'
              type='text' 
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <p className='text-sm '>Input Your Password Again</p>

            <input 
              className='w-full max-w-xs input input-bordered input-info'
              placeholder='Type here'
              type='text' 
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <button className='px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => handleSetPassword()} >Set password</button>
            <button className='px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 '
              onClick={() => router.push('/home')} >Cancel</button>

          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default SetPassword;
