// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserAccount, LockedPrivateKey } from '@choko-wallet/core';

const initial = createAsyncThunk(
  'users/init',
  async (userAccount: UserAccount) => {
    await userAccount.init();
  }
)

const signMessage = createAsyncThunk(
  'users/signMessage',
  async (payload: SignMessagePayload) => {
    const {userAccount, message} = payload;
    const response: Uint8Array = await userAccount.signMessage(message);
    return response;
  }
)

interface SignMessagePayload {
  userAccount: UserAccount;
  message: Uint8Array;
}
interface UserSliceItem {
  userAccount: UserAccount;
  lockedPrivateKey: LockedPrivateKey;
  signMessage: Uint8Array;
}

const initialState: UserSliceItem = {
  userAccount: new UserAccount({
    hasEncryptedPrivateKeyExported: false,
    keyType: 'sr25519',
    localKeyEncryptionStrategy: 0
  }),
  lockedPrivateKey: null,
  signMessage: null
};

export const userSlice = createSlice({
  initialState,
  name: 'user',

  reducers: {
    // save userAccount
    seedToUserAccount: (state, action: PayloadAction<string>) => {
      const userAccount = UserAccount.seedToUserAccount(action.payload, {
        hasEncryptedPrivateKeyExported: false,
        keyType: 'sr25519', // sr25519
        localKeyEncryptionStrategy: 0 // password-v0
      });
      state.userAccount = userAccount;
    },

    // lock userAccount
    lockUserAccount: (state, action: PayloadAction<Uint8Array>) => {
      const passwordHash = action.payload;
      const userAccount = state.userAccount;
      state.lockedPrivateKey = userAccount.lockUserAccount(passwordHash);
    },

    // unlock userAccount
    unlockUserAccount: (state, action: PayloadAction<Uint8Array>) => {
      const passwordHash = action.payload;
      const userAccount = UserAccount.unlockUserAccount(state.lockedPrivateKey, passwordHash);
      state.userAccount = userAccount;
    }
  },

  extraReducers: (builder) => {
    // init
    builder.addCase(initial.fulfilled, (state, action) => {
      console.log("initialized");
    }),
    
    // signMessage
    builder.addCase(signMessage.fulfilled, (state, action) => {
      state.signMessage = action.payload;
      console.log("signed message");
    })
  }
});

export default userSlice.reducer;
