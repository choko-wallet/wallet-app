// Copyright 2021-2022 @choko-wallet/network-sidebar-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { XIcon } from '@heroicons/react/outline';
import React from 'react';

import { CSSTransition } from '@choko-wallet/app-common';
import { selectStatus, toggle, useDispatch, useSelector } from '@choko-wallet/app-redux';

import NetworkSelection from './NetworkSelectionList';

/**
 * wrapper of the NetworkSelection list for mobile devices
 */

export default function NetworkSidebarMobile(): JSX.Element {
  const nodeRef = React.useRef(null);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  return (
    <CSSTransition
      className='md:hidden z-40 p-6 w-[340px] bg-[#DEE8F1] dark:bg-[#22262f] absolute top-0 bottom-0'
      classNames='drawer'
      in={status.homeMobileDrawer}
      nodeRef={nodeRef}
      timeout={500}
      unmountOnExit
    >
      <div ref={nodeRef}>
        <p className='text-lg flex mt-8 w-full font-semibold justify-between text-black dark:text-white font-poppins'>Switch Network
          <XIcon className=' text-black dark:text-white h-8 w-8 cursor-pointer '
            onClick={() => dispatch(toggle('homeMobileDrawer'))} />
        </p>

        <div className='flex md:flex-col items-center md:h-full bg-transparent' >
          <NetworkSelection />
        </div>
      </div>
    </CSSTransition>
  );
}
