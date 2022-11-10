// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { u8aToHex } from '@skyekiwi/util';

import { KnownNetworks, Network } from '@choko-wallet/core';
import { xxHash } from '@choko-wallet/core/util';
import { knownNetworks } from '@choko-wallet/known-networks';

/* eslint-disable sort-keys */
interface NetworkSliceItem {
  currentNetwork: string,
  knownNetworks: KnownNetworks,
}

const initialState: NetworkSliceItem = {
  currentNetwork: u8aToHex(xxHash('skyekiwi')),
  knownNetworks: {}
};

export const networkSlice = createSlice({
  initialState,
  name: 'network',
  reducers: {
    // Load from KnownNetworks from the SDK.
    // + addedNetwork = localNetwork
    // - hiddenNetwork
    loadAllNetworks: (state) => {
      let rawLocalNetworks = localStorage.getItem('localNetwork');

      if (!rawLocalNetworks) rawLocalNetworks = '{}';
      const localNetwork = JSON.parse(rawLocalNetworks) as KnownNetworks;

      let rawHiddenNetworks = localStorage.getItem('hiddenNetworks');

      if (!rawHiddenNetworks) rawHiddenNetworks = '[]';
      const hiddenNetworks = JSON.parse(rawHiddenNetworks) as string[];

      state.knownNetworks = {
        ...knownNetworks, ...localNetwork
      };

      for (const tbr of hiddenNetworks) {
        delete state.knownNetworks[tbr];
      }

      const lastSelectedNetwork = localStorage.getItem('lastSelectedNetwork');

      if (lastSelectedNetwork) {
        state.currentNetwork = lastSelectedNetwork;
      }
    },

    setCurrentNetwork: (state, action: PayloadAction<string>) => {
      localStorage.setItem('lastSelectedNetwork', action.payload);
      state.currentNetwork = action.payload;
    },

    addNetworkAndSave: (state, action: PayloadAction<Network>) => {
      let rawLocalNetworks = localStorage.getItem('localNetwork');

      if (!rawLocalNetworks) rawLocalNetworks = '{}';

      const localNetwork = JSON.parse(rawLocalNetworks) as KnownNetworks;

      // if already exist - override it!
      localNetwork[u8aToHex(xxHash(action.payload.info))] = action.payload;
      localStorage.setItem('localNetwork', JSON.stringify(localNetwork));

      state.knownNetworks[u8aToHex(xxHash(action.payload.info))] = action.payload;
      state.currentNetwork = u8aToHex(xxHash(action.payload.info));
    },

    removeNetworkAndSave: (state, action: PayloadAction<string>) => {
      const tbr = action.payload;

      let rawHiddenNetworks = localStorage.getItem('hiddenNetworks');

      if (!rawHiddenNetworks) rawHiddenNetworks = '[]';
      const hiddenNetworks = JSON.parse(rawHiddenNetworks) as string[];

      hiddenNetworks.push(tbr);
      localStorage.setItem('hiddenNetworks', JSON.stringify(hiddenNetworks));

      if (state.knownNetworks[tbr]) {
        delete state.knownNetworks[tbr];
      } else {
        // pass
        // We always sync knownNetwork with localNetwork
        // Therefore, everything in localNetwork should be in KnownNetwork at this time
      }
    },

    resetLocalData: () => {
      localStorage.removeItem('hiddenNetworks');
      localStorage.removeItem('localNetwork');
      localStorage.removeItem('lastSelectedNetwork');
    }
  }
});

export const { addNetworkAndSave, loadAllNetworks, removeNetworkAndSave, setCurrentNetwork } = networkSlice.actions;
export default networkSlice.reducer;
