// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Footer from '../../components/Footer';

import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Home (): JSX.Element {
  
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [tab, setTab] = useState<string>('balance');
  const [currentAccount, setCurrentAccount] = useState<string>('5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC');
  const [allAccounts, setAllAccounts] = useState<string[]>([
    '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
    '6DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
  ]);

  useEffect(() => {

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
  <>
  <main className='grid grid-cols-12 gap-4 h-screen content-between bg-gray-400'>

    <div className='col-span-12'>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Choko Wallet Logo</a>
          {/* <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <DotsVerticalIcon className="h-5 w-5" />
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Setting</a></li>
              <li><a>About</a></li>
            </ul>
          </div> */}
        </div>
        <div className="navbar-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost normal-case">
              Current Account: {currentAccount}
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
              {allAccounts.map((account, index) => (
                <li key={index}>
                  <a onClick={() => setCurrentAccount(account)}>@{account}</a>
                </li>
              ))}
              <div className='divider'></div>
            </ul>
          </div>
          {/* <a className="btn btn-ghost normal-case text-xl">Choko Wallet</a> */}
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      {/* <div className="dropdown col-span-4">
        <label tabIndex={0} className="btn btn-outline w-full normal-case">
          {"14jyn27doBSRmSEx2ynac8LVw92wJAxKbuDhHkJRHhebwk54"}
          <ChevronDoubleDownIcon
            className='ml-2 h-4 duration-300 hover:scale-125 transtion east-out' />
        </label>

        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 w-full">
          <li><a>{"14jyn27doBSRmSEx2ynac8LVw92wJAxKbuDhHkJRHhebwk54"}</a></li>
          <li><a>{"14jyn27doBSRmSEx2ynac8LVw92wJAxKbuDhHkJRHhebwk54"}</a></li>
          <div className="divider" />
          <li><a>{"Remove Account"}</a></li>
        </ul>
      </div> */}
    </div>

    
    <div className='col-span-8 col-start-3'>
      <div className='col-span-12 shadow-xl rounded-lg'>
          <div className='card'
            style={{ background: 'white' }}>
            <div className='grid grid-cols-12'>
              {/* <div className='col-span-12'>
                <div className='tabs tabs-boxed bg-transparent'>
                  <a className={`tab ${tab === 'balance' ? 'tab-active' : ''}`}
                      onClick={() => setTab('balance')}>Balnace</a>
                  <a className={`tab ${tab === 'setting' ? 'tab-active' : ''}`}
                    onClick={() => setTab('setting')}>Setting</a>
                </div>
              </div> */}

              <div className='col-span-10 p-10'>
                <h2 className='card-title'>
                  Account Balance
                </h2>
                <h3>Hint: select network on right. </h3>
              </div>

              <div className='col-span-2 p-5 bg-gray-300'>
                <div className='form-control'>
                  <label className='label cursor-pointer'>
                    <input checked
                      className='radio checked:bg-red-500'
                      name='radio-6'
                      type='radio' />
                    <span className='label-text'>Polkadot</span>
                  </label>
                </div>
                <div className='form-control'>
                  <label className='label cursor-pointer'>
                    <input checked
                      className='radio checked:bg-blue-500'
                      name='radio-6'
                      type='radio' />
                    <span className='label-text'>Kusama</span>
                  </label>
                </div>
                {/* <div className="btn-group btn-group-vertical">
                  <button className="btn">Polkadot</button>
                  <button className="btn">Kusama</button>
                  <button className="btn">SkyeKiwi</button>
                </div> */}
              </div>

            </div>
          </div>
        </div>
        <div className='col-span-12'></div>
    </div>

    <div className='col-span-12 content-end'>
      <Footer />
    </div>
  </main>
  
  </>);
}

export default Home;
