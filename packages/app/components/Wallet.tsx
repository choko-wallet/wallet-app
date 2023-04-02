// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { BalanceInfo } from "@choko-wallet/app-utils";
import { Balance } from "@choko-wallet/balance-module";
import { NetworkSidebar } from "@choko-wallet/app-network-sidebar";
import SendTokenModal from "./modal/SendTokenModal";
import ReceiveTokenModal from "./modal/ReceiveTokenModal";
import AddNetworkModal from "./modal/AddNetworkModal";
import AddTokenModal from "./modal/AddTokenModal";

interface Props {
  balance: BalanceInfo;
}

function Wallet({ balance }: Props): JSX.Element {
  return (
    <div className='min-h-[750px] mb-6 lg:mb-12 bg-transparent h-70v w-full dark:bg-[#0A0A0B] max-w-screen-xl mx-auto'>
      <div className=' max-w-4xl mx-auto flex-col h-full w-full flex md:flex-row px-3  '>
        <NetworkSidebar />
        <Balance balance={balance} />
      </div>

      <SendTokenModal balanceInfo={balance} />
      <ReceiveTokenModal />
      <AddNetworkModal />
      <AddTokenModal />
    </div>
  );
}

export default Wallet;
