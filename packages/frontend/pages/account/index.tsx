// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { ArrowSmRightIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AccountRouter (): JSX.Element {
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
    <main className='grid grid-cols-12 gap-4 h-screen content-center color-bg'>
      <div className='grid grid-cols-12 col-span-10 col-start-2 md:col-span-4 md:col-start-5 gap-y-5'>
        <div className=' col-span-12 shadow-xl rounded-lg'>
          <div className='card p-5 md:p-10 '
            style={{ background: 'white' }}>
            <h2 className='card-title'>
              Create Your Account
            </h2><br />
            <h3>You may either import or generate a new 12 word mnemonic seeds. You will be asked to create a password for it.</h3>

            <div className='grid grid-cols-8 gap-5 m-10'>
              <button className='btn col-span-8 md:col-span-3'
                onClick={() => router.push('account/create')}>
                Create New Mnemonic
              </button>
              <button className='btn btn-accent col-span-8 md:col-span-3'
                onClick={() => router.push('account/import$')}>
                Import Mnemonic
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountRouter;
