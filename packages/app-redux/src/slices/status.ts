// Copyright 2021-2022 @choko-wallet/app-redux authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

/**
 * statusSlice is used for controlling model behaviours & Loading behavior
 */

/* eslint-disable sort-keys */
interface StatusSliceItem {
  status: {
    [key: string]: boolean;
  };
  loading: string;
}

const initialState: StatusSliceItem = {
  status: {
    homeSend: false,
    homeReceive: false,
    homeAddNetwork: false,
    homeAddToken: false,
    homeQRScanner: false,
    homeMobileDrawer: false,
    settingsExportUrl: false,
    connectDappPasswordModal: false,
    signTxPasswordModal: false,
    signMessagePasswordModal: false,
    decryptMessagePasswordModal: false,
    requestPassword: false,
    testRequest: false,
    landingEmailPost: false,
    landingLogin1: false,
    landingLogin2: false,
    landingLogin3: false
  },
  loading: ''
};

export const statusSlice = createSlice({
  initialState,
  name: 'status',
  reducers: {
    setOpen: (state, action: PayloadAction<string>) => {
      const name = action.payload;

      if (state.status[name] !== undefined) {
        state.status[name] = true;
      } else {
        console.error(`Moving component name not found ${name}`);
        // pass
      }
    },
    setClose: (state, action: PayloadAction<string>) => {
      const name = action.payload;

      if (state.status[name] !== undefined) {
        state.status[name] = false;
      } else {
        console.error(`Moving component name not found ${name}`);
        // pass
      }
    },
    toggle: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const currentStatus = current(state.status);

      if (state.status[name] !== undefined) {
        state.status[name] = !currentStatus[name];
      } else {
        console.error(`Moving component name not found ${name}`);
        // pass
      }
    },
    startLoading: (state, action: PayloadAction<string>) => {
      const title = action.payload;

      state.loading = title;
    },

    endLoading: (state) => {
      state.loading = '';
    }
  }
});

export const { endLoading, setClose, setOpen, startLoading, toggle } =
  statusSlice.actions;
export default statusSlice.reducer;
