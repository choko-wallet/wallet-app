// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

function Home (): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400'>

    {/* <div className='grid grid-cols-12 col-span-8 col-start-3'>
      <div className="dropdown col-span-4">
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
      </div>
    </div> */}

    <div className='grid grid-cols-12 col-span-8 col-start-3'>

      <div className='col-span-12 shadow-xl rounded-lg'>
        <div className='card'
          style={{ background: 'white' }}>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <div className='tabs tabs-boxed bg-transparent'>
                <a className='tab'>Tab 1</a>
                <a className='tab tab-active'>Tab 2</a>
                <a className='tab'>Tab 3</a>
              </div>
              {/* <div className="btn-group btn-group-vertical">
                <button className="btn">Polkadot</button>
                <button className="btn">Kusama</button>
                <button className="btn">SkyeKiwi</button>
              </div> */}
            </div>

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
  </main>);
}

export default Home;
