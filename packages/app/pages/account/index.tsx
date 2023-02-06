// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { ArrowSmRightIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AccountRouter(): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className='min-h-screen bg-[#2E304A] flex items-center justify-center'>

      <div className='bg-[#FFFDF9] rounded-[10px] flex flex-col space-y-10 items-center justify-center w-full max-w-3xl p-5 sm:p-12 md:p-24 mx-[20px] lg:m-12'>

        <p className=' text-black font-semibold text-[24px] md:text-2xl md:-mt-5 font-poppins'>
          Create An Account
        </p>
        <p className=' text-black font-poppins text-center mx-3'>
          Import your mnemonic seed or generate a new 12-word mnemonic seed. You will be asked to create a password for your wallet.
        </p>

        <div className='flex flex-col md:flex-row justify-between items-center w-full md:px-6 pt-5 md:pt-8 lg:pt-12 pb-3'>

          <button className='w-56 h-[58px] font-bold text-[#F5CBD5] transition duration-150
                bg-[#0170BF] rounded-md hover:shadow-sm active:scale-95 '
            onClick={() => router.push('account/create')}>
            <p>Create New </p>
            <p>Mnemonic Seed</p>

          </button>

          <button className='mt-5 md:mt-0 w-56 h-[58px] text-[#0170BF] transition duration-150 bg-[#E5EFF0] rounded-md hover:shadow-sm active:scale-95 border border-[#0170BF]'
            onClick={() => router.push('account/import')}>
            Import Mnemonic
          </button>

        </div>

      </div>

    </main>
  );
}

export default AccountRouter;
