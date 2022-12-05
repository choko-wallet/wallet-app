// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Balance from '@choko-wallet/frontend/components/balance/Balance';
import Footer from '@choko-wallet/frontend/components/Footer';
import AddNetworkModal from '@choko-wallet/frontend/components/modal/AddNetworkModal';
import AddTokenModal from '@choko-wallet/frontend/components/modal/AddTokenModal';
import ExportAccountModal from '@choko-wallet/frontend/components/modal/ExportAccountModal';
import ReceiveTokenModal from '@choko-wallet/frontend/components/modal/ReceiveTokenModal';
import SendTokenModal from '@choko-wallet/frontend/components/modal/SendTokenModal';
import NetworkSidebar from '@choko-wallet/frontend/components/networkSidebar/NetworkSidebar';
import NetworkSidebarMobile from '@choko-wallet/frontend/components/networkSidebar/NetworkSidebarMobile';
import encodeAddr, { fetchAAWalletAddress } from '@choko-wallet/frontend/utils/aaUtils';
import { BalanceInfo } from '@choko-wallet/frontend/utils/types';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectLoading, selectUserAccount } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { loadAllNetworks } from '../../features/slices/network';
import { endLoading, startLoading } from '../../features/slices/status';
import { loadUserAccount, noteAAWalletAddress } from '../../features/slices/user';
import { ethFetchBalance } from '../../utils/ethFetchBalance';
import { polkadotFetchBalance } from '../../utils/polkadotFetchBalance';
import { toastFail } from '../../utils/toast';

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
  const [loading, setLoading] = useState<boolean>(false);

  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({});

  // Init user account & networks
  useEffect(() => {
    // IF account is not in localStorage - redirect to account creation page
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      // We are all good. Load UserAccount & Networks
      dispatch(loadAllNetworks());

      try {
        dispatch(loadUserAccount());
      } catch (e) {
        void (async () => {
          const aaAddresses = await fetchAAWalletAddress(userAccount);

          dispatch(noteAAWalletAddress(aaAddresses));
        })();
      }
    }
  }, [dispatch, router, userAccount]);

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
    /** Fetch Balance && AAWallet Address */
    void (async () => {
      dispatch(startLoading('Fetching Balance ...'));

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
    })();

    setMounted(true);
  }, [currentNetwork, currentUserAccount, knownNetworks, dispatch, userAccount]);

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
        <NetworkSidebarMobile />

        < main className='min-h-[750px] my-6 lg:my-12 bg-transparent h-70v w-full dark:bg-[#22262f] max-w-screen-xl mx-auto' >
          <div className='bg-transparent flex-col h-full w-full flex md:flex-row px-3 md:px-8 '>
            <NetworkSidebar />
            <Balance balance={balanceInfo} />
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
