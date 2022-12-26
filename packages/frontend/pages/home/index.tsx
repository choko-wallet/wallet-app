// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import BalanceModule from '@choko-wallet/balance-module/Balance';
import NetworkSidebar from '@choko-wallet/network-sidebar-module/NetworkSidebar';
import NetworkSidebarMobile from '@choko-wallet/network-sidebar-module/NetworkSidebarMobile';

import Footer from '@choko-wallet/frontend/components/Footer';
import Loading from '../../components/Loading';
import Header from '@choko-wallet/header-module/Header';

import AddNetworkModal from '@choko-wallet/frontend/components/modal/AddNetworkModal';
import AddTokenModal from '@choko-wallet/frontend/components/modal/AddTokenModal';
import ExportAccountModal from '@choko-wallet/frontend/components/modal/ExportAccountModal';
import ReceiveTokenModal from '@choko-wallet/frontend/components/modal/ReceiveTokenModal';
import SendTokenModal from '@choko-wallet/frontend/components/modal/SendTokenModal';

import encodeAddr, { fetchAAWalletAddress } from '@choko-wallet/frontend-utils-module/aaUtils';
import { BalanceInfo } from '@choko-wallet/frontend-utils-module/types';

import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectLoading, selectUserAccount } from '@choko-wallet/redux-module/redux/selectors';
import { useAppThunkDispatch } from '@choko-wallet/redux-module/redux/store';
import { loadAllNetworks } from '@choko-wallet/redux-module/slices/network';
import { endLoading, startLoading } from '@choko-wallet/redux-module/slices/status';
import { loadUserAccount, noteAAWalletAddress } from '@choko-wallet/redux-module/slices/user';

import { ethFetchBalance } from '@choko-wallet/frontend-utils-module/ethFetchBalance';
import { polkadotFetchBalance } from '@choko-wallet/frontend-utils-module/polkadotFetchBalance';
import { toastFail } from '@choko-wallet/frontend-utils-module/toast';

/**
 * Main dashboard
 */
/* eslint-disable sort-keys */
export default function Home(): JSX.Element {
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

  if (theme !== 'dark' && theme !== 'light') {
    setTheme('light');
  }

  if (!mounted || !localStorage.getItem('serialziedUserAccount')) { return null; }

  if (loadingText) return <Loading />;

  console.log(knownNetworks, userAccount);

  return (
    <div className={theme}>

      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:from-[#22262f] dark:to-[#22262f] min-h-screen flex flex-col justify-between'>
        <Toaster />
        <Header />
        <NetworkSidebarMobile />

        < main className='min-h-[750px] my-6 lg:my-12 bg-transparent h-70v w-full dark:bg-[#22262f] max-w-screen-xl mx-auto' >
          <div className='bg-transparent flex-col h-full w-full flex md:flex-row px-3 md:px-8 '>
            <NetworkSidebar />
            {/* <Balance balance={balanceInfo} /> */}
            <BalanceModule balance={balanceInfo} />
          </div>

          <SendTokenModal balanceInfo={balanceInfo} />

          <ReceiveTokenModal />

          <AddNetworkModal />

          <AddTokenModal />

          <ExportAccountModal />
        </main >
        <Footer />

      </div >
    </div >
  );
}
