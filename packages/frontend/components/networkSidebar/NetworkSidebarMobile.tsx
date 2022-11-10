// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import NetworkSelection from '@choko-wallet/frontend/components/networkSidebar/NetworkSelection';
import { toggle } from '@choko-wallet/frontend/features/slices/status';

import { selectStatus } from '../../features/redux/selectors';

export default function NetworkSidebarMobile (): JSX.Element {
  const nodeRef = React.useRef(null);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  return (<CSSTransition
    className='md:hidden z-40 p-6 w-[300px] bg-[#DEE8F1] dark:bg-[#22262f] absolute top-0 bottom-0'
    classNames='drawer'
    in={status.homeMobileDrawer}
    nodeRef={nodeRef}
    timeout={500}
    unmountOnExit
  >
    <div ref={nodeRef}>
      <p className='text-lg flex  w-full font-semibold justify-between text-black dark:text-white font-poppins'>Change Network
        <XIcon className=' text-black dark:text-white h-8 w-8 cursor-pointer '
          onClick={() => dispatch(toggle('homeMobileDrawer'))} />
      </p>

      <div className='flex md:flex-col items-center md:h-full bg-transparent' >

        <NetworkSelection />

      </div>
    </div>
  </CSSTransition>);
}
