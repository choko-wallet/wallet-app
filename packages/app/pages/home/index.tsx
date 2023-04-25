// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BalanceInfo } from "@choko-wallet/app-utils";

import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
// import AddNetworkModal from "packages/app/components/modal/AddNetworkModal";
// import AddTokenModal from "packages/app/components/modal/AddTokenModal";
// import ReceiveTokenModal from "packages/app/components/modal/ReceiveTokenModal";
// import SendTokenModal from "packages/app/components/modal/SendTokenModal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Defi from "@choko-wallet/app/components/Defi";
import NFTs from "@choko-wallet/app/components/NFTs";
import Profile from "@choko-wallet/app/components/Profile";
// import Wallet from "@choko-wallet/app/components/Wallet";
import Wallet2 from "@choko-wallet/app/components/Wallet2";
import { AccountInHeader } from "@choko-wallet/app-header";
import { NetworkSidebarMobile } from "@choko-wallet/app-network-sidebar";
import {
  endLoading,
  loadAllNetworks,
  loadUserAccount,
  noteAAWalletAddress,
  selectCurrentNetwork,
  selectCurrentUserAccount,
  selectKnownNetworks,
  selectLoading,
  selectUserAccount,
  startLoading,
  useAppThunkDispatch,
} from "@choko-wallet/app-redux";
// import { toastFail } from "@choko-wallet/app-utils";
import {
  encodeAddr,
  ethFetchBalance,
  fetchAAWalletAddress,
  polkadotFetchBalance,
  toastFail,
} from "@choko-wallet/app-utils";

// import { Balance } from '@choko-wallet/balance-module';
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import logo from "../../images/logo.png";
import { initialTabs as tabs } from "../../utils/tabs";
import Domain from "@choko-wallet/app/components/Domain";

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

    if (
      localStorage.getItem("serialziedUserAccount") ||
      localStorage.getItem("mpcKey")
    ) {
      try {
        dispatch(loadUserAccount());
      } catch (e) {
        // This means that the AA Wallet info is not arranged as expected.
        // We gotta fetch from chain
        console.log(e);
      }
    } else {
      // we somehow ended up in this page? Force redirect to home and complete account signin
      void router.push("/");
    }
  }, [currentNetwork, dispatch, router]);

  useEffect(() => {
    // Fetch balance and price once the network & user account is loaded in Redux
    if (!knownNetworks) return;
    if (!currentUserAccount) return;
    if (!currentNetwork) return;

    // no need to await
    /** Fetch Balance && AAWallet Address */
    (async () => {
      dispatch(startLoading("Fetching Balance ..."));

      // 1. Fetch AA Wallet Info when needed.
      // if (!currentUserAccount.aaWalletAddress) {
      const populateAAWalletInfo = async () => {
        // const aaAddresses = await fetchAAWalletAddress(userAccount);

        // no await for ui
        const aaAddresses = ["0x2A721dc0578E21392f1A0F796093D93AD0C29656"];

        dispatch(noteAAWalletAddress(aaAddresses));
      };

      await populateAAWalletInfo();

      const network = knownNetworks[currentNetwork];

      switch (network.networkType) {
        case "polkadot":
          try {
            const res = await polkadotFetchBalance(
              network,
              encodeAddr(network, currentUserAccount)
            );

            setBalanceInfo(res);

            // no await for ui
            // setBalanceInfo({
            //   native: {
            //     balance: 0,
            //     balanceInUSD: 0,
            //     img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/dot.png",
            //     name: "skyekiwi",
            //     priceInUSD: 0,
            //     symbol: "SKW",
            //   },
            // });

            dispatch(endLoading());
            // toastSuccess(`Changed to ${network.text}`);
          } catch (e) {
            console.error(e);
            dispatch(endLoading());
            toastFail("Someting Wrong! Please Switch To Other Network.");
          }

          break;
        case "ethereum":
          try {
            // const res = await ethFetchBalance(
            //   network,
            //   encodeAddr(network, currentUserAccount)
            // );

            // setBalanceInfo(res);

            // no await for ui
            setBalanceInfo({
              native: {
                balance: 0,
                img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
                decimals: 18,
                name: "goerli",
                symbol: "GoerliETH",
                priceInUSD: 0,
                balanceInUSD: 0,
              },
            });

            dispatch(endLoading());
            // toastSuccess(`Changed to ${network.text}`);
          } catch (e) {
            console.error(e);
            dispatch(endLoading());
            toastFail("Someting Wrong! Please Switch To Other Network.");
          }

          break;
      }
    })().catch(console.error);

    setMounted(true);
  }, [
    knownNetworks,
    currentUserAccount,
    currentNetwork,
    dispatch,
    userAccount,
  ]);

  useEffect(() => {
    setTheme("dark");
    // setTheme("light");
  }, [setTheme]);

  if (!mounted) {
    return null;
  }

  if (loadingText) return <Loading />;

  return (
    <div className={theme}>
      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:bg-gradient-to-br dark:from-[#0A0A0B] dark:to-[#0A0A0B] min-h-screen flex flex-col justify-between transition-all duration-700 ease-out'>
        <NetworkSidebarMobile />

        <div className='w-full flex-1  flex flex-col'>
          {/* header */}
          <div className='relative flex items-center justify-center  space-x-1 p-2 md:px-3 lg:px-6 sm:py-6 md:py-12 md:space-x-3 sm:justify-between  '>
            <div className='lg:w-20 xl:w-72 xl:flex xl:justify-start'>
              <div className='bg-transparent h-10 w-10 md:h-12 md:w-12 relative '>
                <Image
                  layout='fill'
                  objectFit='contain'
                  // height={32}
                  // width={32}
                  onClick={() => router.push("/")}
                  src={logo.src}
                />
              </div>
            </div>

            <div className='absolute top-2 left-12 bg-gradient-to-r from-[#DEE8F1] dark:from-[#1A1A1A] to-transparent h-[58px] w-6 md:hidden z-50'></div>

            <div className='flex items-center justify-center space-x-3 overflow-x-scroll scrollbar-thin bg-transparent'>
              <div className='bg-gray-300 dark:bg-[#1A1A1A] overflow-x-scroll scrollbar-thin  flex-1 flex items-center md:justify-evenly md:overflow-hidden space-x-3 w-full md:w-[650px]  md:mx-auto md:rounded-full max-w-screen  whitespace-nowrap relative h-[58px] px-6 sm:px-10 max-w-[660px]'>
                {tabs.map((item) => (
                  <div
                    className={
                      item === selectedTab
                        ? " font-inter text-[16x] cursor-pointer px-3 py-1 transition duration-150 rounded-full bg-[#0170BF] font-semibold text-[#F5CBD5] active:scale-90 ease-in-out"
                        : "text-black dark:text-white font-inter text-[12px] font-normal cursor-pointer px-3 py-1 transition duration-150 rounded-full shadow-md  hover:bg-[#0170BF] hover:font-semibold hover:text-[#F5CBD5] hover:shadow-xl active:scale-90 ease-in-out"
                    }
                    key={item.label}
                    onClick={() => setSelectedTab(item)}
                  >
                    {`${item.label}`}
                  </div>
                ))}
              </div>

              <div className='hidden xl:inline-flex bg-gray-300 dark:bg-[#1A1A1A] items-center rounded-full max-w-screen overflow-x-scroll scrollbar-thin whitespace-nowrap relative h-[58px] px-3'>
                <div
                  className='text-black dark:text-white font-inter text-[12px] font-normal cursor-pointer px-3 py-1 transition duration-150 rounded-full shadow-md  hover:bg-[#0170BF] hover:font-semibold hover:text-[#F5CBD5] hover:shadow-xl active:scale-90 ease-in-out '
                  // onClick={() => setSelectedTab(item)}
                >
                  All
                </div>
              </div>
            </div>

            <div className='flex items-center justify-center'>
              <div className='hidden 2xl:inline-flex w-8 '>
                {theme === "light" ? (
                  <SunIcon
                    className='hidden h-7 transition text-gray-800 duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 '
                    onClick={() => setTheme("dark")}
                  />
                ) : (
                  <MoonIcon
                    className='hidden h-7  transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-white'
                    onClick={() => setTheme("light")}
                  />
                )}
              </div>
              <div className='xl:bg-[#1A1A1A] xl:rounded-md  '>
                <AccountInHeader />
              </div>
            </div>
          </div>

          <main className='w-full flex-1  flex flex-col'>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                initial={{ y: 20, opacity: 0 }}
                key={selectedTab ? selectedTab.label : "empty"}
                transition={{ duration: 0.3 }}
                className=' flex-1 flex flex-col'
              >
                {selectedTab.label === "Wallet" ? (
                  // <Wallet balance={balanceInfo} />
                  <Wallet2 />
                ) : selectedTab.label === "Profile" ? (
                  <Profile balance={balanceInfo} />
                ) : selectedTab.label === "NFT" ? (
                  <NFTs />
                ) : selectedTab.label === "Defi" ? (
                  <Defi />
                ) : selectedTab.label === "Curation" ? (
                  <Domain />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
