// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BalanceInfo } from '@choko-wallet/app-utils';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import AddNetworkModal from 'packages/app/components/modal/AddNetworkModal';
import AddTokenModal from 'packages/app/components/modal/AddTokenModal';
import ExportAccountModal from 'packages/app/components/modal/ExportAccountModal';
import ReceiveTokenModal from 'packages/app/components/modal/ReceiveTokenModal';
import SendTokenModal from 'packages/app/components/modal/SendTokenModal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MenuSidebar from '@choko-wallet/app/components/MenuSidebar';
import Profile from '@choko-wallet/app/components/Profile';
// import { Header } from '@choko-wallet/app-header';
import { NetworkSidebar } from '@choko-wallet/app-network-sidebar';
import { endLoading, loadAllNetworks, loadUserAccount, noteAAWalletAddress, selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectLoading, selectUserAccount, startLoading, useAppThunkDispatch } from '@choko-wallet/app-redux';
import { encodeAddr, ethFetchBalance, fetchAAWalletAddress, polkadotFetchBalance, toastFail } from '@choko-wallet/app-utils';
import { Balance } from '@choko-wallet/balance-module';

import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import { initialTabs as tabs } from '../../utils/tabs';

/**
 * Main dashboard
 */
/* eslint-disable sort-keys */
export default function Home (): JSX.Element {
  const dispatch = useAppThunkDispatch();

  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const userAccount = useSelector(selectUserAccount);
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);
  const loadingText = useSelector(selectLoading);

  const [mounted, setMounted] = useState<boolean>(false);
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({});
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  /**
   * We are loading three things here:
   * 1. the network config (sync)
   * 2. the user account && AA Wallet (async)
   * 3. balance info of the user on this network
   */

  // 1. init the network config
  useEffect(() => {
    dispatch(loadAllNetworks());
  }, [dispatch]);

  // 2. init user account
  useEffect(() => {
    if (!currentNetwork) return;

    // IF account is not in localStorage - redirect to account creation page
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      try {
        dispatch(loadUserAccount());
      } catch (e) {
        // This means that the AA Wallet info is not arranged as expected.
        // We gotta fetch from chain
        console.log(e);
      }
    }
  }, [currentNetwork, dispatch, router]);

  useEffect(() => {
    // Fetch balance and price once the network & user account is loaded in Redux
    if (!knownNetworks) return;
    if (!currentUserAccount) return;
    if (!currentNetwork) return;

    console.log('fetching balance ', userAccount, knownNetworks, currentNetwork);

    // no need to await
    /** Fetch Balance && AAWallet Address */
    (async () => {
      dispatch(startLoading('Fetching Balance ...'));

      console.log('aaWalletAddress', currentUserAccount.aaWalletAddress);

      // 1. Fetch AA Wallet Info when needed.
      // if (!currentUserAccount.aaWalletAddress) {
      const populateAAWalletInfo = async () => {
        const aaAddresses = await fetchAAWalletAddress(userAccount);

        dispatch(noteAAWalletAddress(aaAddresses));
      };

      await populateAAWalletInfo();
      // }

      const network = knownNetworks[currentNetwork];

      switch (network.networkType) {
        case 'polkadot':
          try {
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
    })().catch(console.error);

    setMounted(true);
  }, [knownNetworks, currentUserAccount, currentNetwork, dispatch, userAccount]);

  useEffect(() => { // figma只有黑色版本 先默认设置黑色
    setTheme('dark');
  }, [setTheme]);

  if (!mounted || !localStorage.getItem('serialziedUserAccount')) { return null; }

  if (loadingText) return <Loading />;

  console.log(knownNetworks, userAccount);
  console.log('balance-home', balanceInfo);

  return (
    <div className={theme}>

      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:bg-gradient-to-br dark:from-[#0A0A0B] dark:to-[#0A0A0B] min-h-screen flex flex-col justify-between transition-all duration-700 ease-out'>
        {/* <Toaster /> */}
        {/* <Header /> */}
        {/* <NetworkSidebarMobile /> */}
        <MenuSidebar />

        <div className='w-full h-full '>
          <nav className='bg-[#1A1A1A] flex items-center mt-[60px] space-x-3 w-[800px] h-[66px] mx-auto justify-evenly rounded-full'>
            <ul className='flex justify-evenly w-full '>
              {tabs.map((item) => (
                <li
                  className={item === selectedTab
                    ? ' font-inter text-[15px] cursor-pointer px-3 py-1 transition duration-150 rounded-full bg-[#0170BF] font-semibold text-[#F5CBD5] active:scale-90 '
                    : 'text-white font-inter text-[15px] font-normal cursor-pointer px-3 py-1 transition duration-150 rounded-full shadow-md  hover:bg-[#0170BF] hover:font-semibold hover:text-[#F5CBD5] hover:shadow-xl active:scale-90 '}
                  key={item.label}
                  onClick={() => setSelectedTab(item)}
                >
                  {`${item.label}`}

                </li>
              ))}
            </ul>
          </nav>

          <main className='w-full h-full'>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                initial={{ y: 20, opacity: 0 }}
                key={selectedTab ? selectedTab.label : 'empty'}
                transition={{ duration: 0.3 }}
              >
                {selectedTab.label === 'Wallet'
                  ? <div className='min-h-[750px] my-6 lg:my-12 bg-transparent h-70v w-full dark:bg-[#0A0A0B] max-w-screen-xl mx-auto' >
                    <div className='bg-transparent flex-col h-full w-full flex md:flex-row px-3 md:px-8 '>
                      <NetworkSidebar />
                      {/* <Balance balance={balanceInfo} /> */}
                      <Balance balance={balanceInfo} />
                    </div>

                    <SendTokenModal balanceInfo={balanceInfo} />

                    <ReceiveTokenModal />

                    <AddNetworkModal />

                    <AddTokenModal />

                    <ExportAccountModal />
                  </div >
                  : selectedTab.label === 'Profile'
                    ? <Profile balance={balanceInfo} />
                    : null
                }

              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* <Navbar /> */}

        <Footer />

      </div >

    </div >
  );
}
