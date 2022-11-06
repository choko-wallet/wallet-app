// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface StatusSliceItem {
  status: {
    [key: string]: boolean
  }
}

const initialState: StatusSliceItem = {
  status: {
    homeSend: false,
    homeReceive: false,
    homeAddNetwork: false,
    homeAddToken: false,
    homeQRScanner: false,
    homeMobileDrawer: false,
    
    requestPassword: false, 
  }
};

/* eslint-disable sort-keys */
export const statusSlice = createSlice({
  initialState,
  name: 'status',
  reducers: {
    setOpen: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      if (state.status.hasOwnProperty(name)) {
        state.status[name] = true;
      } else {
        console.error(`Moving component name not found ${name}`)
        // pass
      }
    },
    setClose: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      if (state.status.hasOwnProperty(name)) {
        state.status[name] = false;
      } else {
        console.error(`Moving component name not found ${name}`)
        // pass
      }
    },

    toggle: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const currentStatus = current( state.status );

      if (state.status.hasOwnProperty(name)) {
        state.status[name] = !currentStatus[name];
      } else {
        console.error(`Moving component name not found ${name}`)
        // pass
      }
    },
  },
});

export const { setOpen, setClose, toggle, } = statusSlice.actions;
export default statusSlice.reducer;
