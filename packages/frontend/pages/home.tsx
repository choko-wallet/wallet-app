// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { PaperAirplaneIcon, ArrowDownIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import Footer from '../components/Footer';
import Header from '../components/Header';
import near from '../images/near.png';

import { useDispatch, useSelector } from 'react-redux';
import { selectPassword, selectUserAccount, selectError } from '../features/redux/selectors';
import { deserializeUserAccount } from '../features/slices/userSlice';

function Home(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if(password) {
      dispatch(deserializeUserAccount(password));
    } else {
      router.push('/showpassphrase');
    }
  }, [password])

  useEffect(() => {
    if(error) {
      router.push('/showpassphrase');
    }
  }, [error])

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("userAccount: ", userAccount);

  if (!mounted) {
    return null;
  }

  return (
    <div className=' bg-gradient-to-br from-white via-[#e7bed3] to-white'>
      <Header />

      <div className='relative'>
        <main className='flex flex-col items-center w-6/12 pb-10 m-10 mx-auto space-y-3 shadow-inner shadow-gray-500 rounded-3xl bg-gradient-to-br from-fuchsia-100 via-[#e7bed3] to-fuchsia-100'>
          <p className='mt-8 text-lg italic font-semi-bold' >Total Balance</p>
          <p className='text-3xl font-extrabold '>$793.32</p>
          <p className='font-mono text-xs text-gray-500 '>in Choko Wallet</p>

          <div className='flex p-2 space-x-10'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                <PaperAirplaneIcon className='h-6 text-white rotate-45 cursor-pointer ' />
              </div>
              <p className='pt-2 text-gray-800'>Send</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                <SwitchHorizontalIcon className='h-6 text-white cursor-pointer ' />

              </div>
              <p className='pt-2 text-gray-800'>Receive</p>
            </div>
            <div>
              <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                <ArrowDownIcon className='h-6 text-white cursor-pointer ' />
              </div>
              <p className='pt-2 text-gray-800'>Swap</p>
            </div>

          </div>

          <div className='w-10/12 rounded-lg h-72 bg-[#cfbcdb] '>
            <div className='flex justify-between text-white text-sm p-2 w-full  bg-[#c1aed6] rounded-lg'>
              <p>Your Portfolio</p>
              <p>Token Balance</p>
            </div>

            <div className=' mb-5  w-full  bg-[#cfbcdb] rounded-lg flex justify-between '>
              <div className='flex items-center' >
                <div className='relative w-6 h-6 m-3'>
                  <Image
                    layout='fill'
                    objectFit='contain'
                    src={near}
                  />
                </div>
                <div className='p-1'>
                  <p className='text-lg font-bold'>NEAR</p>
                  <p className='text-xs text-white'>$10.12</p>
                </div>
              </div>

              <div className='p-1'>
                <div className='text-right p-3'>
                  <p className='text-lg font-bold'>78.3912 Near</p>
                  <p className='text-xs text-white'>$793.12USD</p>
                </div>
              </div>
            </div>

          </div>



        </main >
        <div className='absolute top-0 right-20'>
          <div className='dropdown dropdown-hover dropdown-end '>
            <label className='btn m-1 border-transparent  hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none'>
              <p className='flex items-center justify-center'>NETWORK
                <ChevronDownIcon className='pl-2 h-5 cursor-pointer ' /></p>
            </label>
            <ul className='bg-gradient-to-br from-fuchsia-100 via-[#e7bed3] to-fuchsia-100 p-2  dropdown-content menu  rounded-box w-52 shadow-xl'>
              <li className='flex'>
                <a><span className='relative w-6 h-6'>
                  <Image
                    layout='fill'
                    objectFit='contain'
                    src={near}
                  />
                </span>Polkadot</a>
              </li>
              <li><a><span className='relative w-6 h-6'>
                <Image
                  layout='fill'
                  objectFit='contain'
                  src={near}
                />
              </span>Polygon</a>
              </li>
              <li><a><span className='relative w-6 h-6'>
                <Image
                  layout='fill'
                  objectFit='contain'
                  src={near}
                />
              </span>NEAR</a></li>
            </ul>
          </div>
        </div>
      </div >
      <Footer />

    </div >

  );
}

export default Home;
