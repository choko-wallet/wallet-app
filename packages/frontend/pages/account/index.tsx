// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { ArrowSmRightIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AccountRouter(): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className='min-h-screen bg-white'>

      <div className='flex flex-col items-center justify-center w-full text-center pt-20'>
        <p className='text-2xl font-bold text-black '>Create or Import An Account</p>

        <div className="w-96  border border-gray-400 p-3 mt-5 rounded-md bg-gray-100">
          <p className='text-sm  text-black '>Generate and safely store a unique passphrase.This will be used to verify important activity, recover your account and access your account from other devices.</p>
          <button className='px-10 py-4 my-3  font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 '
            onClick={() => router.push('/create')} >Create account</button>
        </div>

        <div className="w-96 border border-gray-400 p-3 mt-5 rounded-md bg-gray-100">
          <p className='text-sm  text-black '>Make sure you have your 12 word recovery phrase, then click below to begin the recovery process.</p>
          <button className='px-10 py-4 my-3  font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 '
            onClick={() => router.push('/create')} >Import account</button>
        </div>


      </div>
    </main>


  );
}

export default AccountRouter;
