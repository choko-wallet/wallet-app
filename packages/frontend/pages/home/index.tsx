// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import AddNetworkModal from '@choko-wallet/frontend/components/AddNetworkModal';
import AddTokenModal from '@choko-wallet/frontend/components/AddTokenModal';
import Balance from '@choko-wallet/frontend/components/Balance';
import Footer from '@choko-wallet/frontend/components/Footer';
import NetworkSelection from '@choko-wallet/frontend/components/NetworkSelection';
import ReceiveTokenModal from '@choko-wallet/frontend/components/ReceiveTokenModal';
import SendTokenModal from '@choko-wallet/frontend/components/SendTokenModal';
import encodeAddr from '@choko-wallet/frontend/utils/encodeAddr';
import { BalanceInfo } from '@choko-wallet/frontend/utils/types';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectLoading, selectStatus } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { loadAllNetworks } from '../../features/slices/network';
import { endLoading, startLoading, toggle } from '../../features/slices/status';
import { loadUserAccount } from '../../features/slices/user';
import { ethFetchBalance } from '../../utils/ethFetchBalance';
import { polkadotFetchBalance } from '../../utils/polkadotFetchBalance';
import { toastFail } from '../../utils/toast';

/* eslint-disable sort-keys */
export default function Home (): JSX.Element {
  const dispatch = useAppThunkDispatch();

  const nodeRef = React.useRef(null);

  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);
  const status = useSelector(selectStatus);
  const loadingText = useSelector(selectLoading);

  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({});

  useEffect(() => {
    if (loadingText && loadingText.length !== 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingText]);

  useEffect(() => {
    // Fetch balance and price once the network & user account is loaded in Redux
    if (!knownNetworks) return;
    if (!currentUserAccount) return;
    if (!currentNetwork) return;

    // no need to await
    void (async () => {
      dispatch(startLoading('Fetching Balance ...'));

      const network = knownNetworks[currentNetwork];

      switch (network.networkType) {
        case 'polkadot':
          try {
            // const res = await polkadotFetchBalance(network, '16aThbzrsb2ohiLXJLqN8jLST6JgUPRi3BqyHxUW4yVHBQ44')
            const res = await polkadotFetchBalance(network, encodeAddr(network, currentUserAccount));

            setBalanceInfo(res);
            dispatch(endLoading());
            // toastSuccess(`Changed to ${network.text}`);
          } catch (e) {
            console.error(e);
            dispatch(endLoading());
            toastFail('Someting Wrong! Please Switch To Other Network.');
          }

          break;
        case 'ethereum':
          try {
            const res = await ethFetchBalance(network, encodeAddr(network, currentUserAccount));
            // const res = await ethFetchBalance(network, '0xa5E4E1BB29eE2D16B07545CCf565868aE34F92a2');
            // const res = await ethFetchBalance(network, '0xBF544eBd099Fa1797Ed06aD4665646c1995629EE');// goerli

            setBalanceInfo(res);
            dispatch(endLoading());
            // toastSuccess(`Changed to ${network.text}`);
          } catch (e) {
            console.error(e);
            dispatch(endLoading());
            toastFail('Someting Wrong! Please Switch To Other Network.');
          }

          break;
      }
    })();

    setMounted(true);
  }, [currentNetwork, currentUserAccount, knownNetworks, dispatch]);

  useEffect(() => {
    // IF account is not in localStorage - redirect to account creation page
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      // We are all good. Load UserAccount & Networks
      dispatch(loadUserAccount());
      dispatch(loadAllNetworks());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (theme !== 'dark' && theme !== 'light') {
      setTheme('light');
    }
  }, [setTheme, theme]);

  if (!mounted || !localStorage.getItem('serialziedUserAccount')) { return null; }

  if (loading) return <Loading />;

  return (
    <div className={theme}>

      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:from-[#22262f] dark:to-[#22262f] min-h-screen flex flex-col justify-between'>
        <Toaster />
        <Header />

        <CSSTransition
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
        </CSSTransition>

        < main className='min-h-[750px] bg-transparent h-80v w-full dark:bg-[#22262f] max-w-7xl mx-auto' >

          <div className='bg-transparent flex-col h-full w-full flex md:flex-row px-3 md:px-8'>

            <div className='bg-transparent'>
              <button
                className='md:hidden mb-2 w-[158px] h-[40px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none '
                onClick={() => dispatch(toggle('homeMobileDrawer'))}
              >
                <p className='ml-1  text-white text-md font-semibold font-poppins'>NETWORK</p>
                <ChevronRightIcon className=' text-white h-6 w-6 ml-6  ' />
              </button>
              <p className='ml-1 hidden md:block text-gray-800 dark:text-white text-md font-semibold font-poppins'>NETWORK</p>

              {/* wideScreen network */}
              <div className=' hidden md:inline-flex md:flex-col bg-transparent dark:bg-[#22262f] items-center md:h-full mr-10' >
                <NetworkSelection />
              </div>
            </div>

            <Balance balance={balanceInfo} />
          </div>

          <SendTokenModal balanceInfo={balanceInfo} />

          <ReceiveTokenModal />

          <AddNetworkModal />

          <AddTokenModal />

        </main >
        <Footer />

      </div >
    </div >
  );
}
