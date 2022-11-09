// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useSelector } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { selectLoading } from '../features/redux/selectors';

interface Props {
  title: string
}

function Loading ({title}: Props): JSX.Element {
  const loading = useSelector(selectLoading);

  return (
    <div className='bg-primary h-screen flex flex-col items-center justify-center'>
      {/* <Toaster /> */}
      <div className='flex items-center space-x-2 mb-10  m-3'>
        <p className='text-sm md:text-2xl'>
          <span className='text-[#0170BF] font-poppins w-36 '>{title ? title : loading}</span>
        </p>
      </div>
      <PacmanLoader color='#ffffff'
        size={30} />
    </div>
  );
}

export default Loading;
