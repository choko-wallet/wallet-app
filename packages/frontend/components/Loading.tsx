// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

interface Props {
  title: string;
}

function Loading ({ title }: Props): JSX.Element {
  return (
    <div className='bg-primary h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center space-x-2 mb-10  m-3'>
        <p className='text-sm md:text-2xl'>
          <span className='text-gradient font-poppins w-36 '>{title}</span>
        </p>
      </div>
      <PacmanLoader color='#ffffff'
        size={30} />
    </div>
  );
}

export default Loading;
