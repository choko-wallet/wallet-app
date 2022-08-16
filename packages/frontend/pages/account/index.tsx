// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AccountRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  useEffect(() => {
    router.push('/account/create');

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400'>
      <div className='grid grid-cols-12 col-span-4 col-start-5 gap-y-5'>
          <div className=' col-span-12 shadow-xl rounded-lg'>
            <div className='card p-10 '
              style={{ background: 'white' }}>
              <h2 className='card-title'>
                Create Mnemonic
              </h2>
              <h3>Generate a 12 words mnemonic.</h3>
            </div>
          </div>

          <div className='col-span-12'></div>

          <div className='col-span-3 col-start-5'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>

          <div className='col-span-3'>
            <button className='btn btn-accent btn-circle btn-lg'
              onClick={() => setStep(step + 1)} >
              <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
    
    </main>);
}

export default AccountRouter;
