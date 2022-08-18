// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserAccount, LockedPrivateKey } from '@choko-wallet/core';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@skyekiwi/util';

interface SetPasswordPayload {
  seeds: string;
  password: string;
}

export const serializeUserAccount = createAsyncThunk(
  'users/serialize',
  async (payload: SetPasswordPayload) => {
    const { seeds, password } = payload;

    let serialized, serializedLockedUserAccount;
    let userAccount = UserAccount.seedToUserAccount(seeds, {
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519',
      localKeyEncryptionStrategy: 0
    });
    await userAccount.init();

    serialized = userAccount.serialize();
    const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
    serializedLockedUserAccount = lockedUserAccount.serialize();

    return {
      serializedUserAccount: u8aToHex(serialized),
      lockedPrivateKey: u8aToHex(serializedLockedUserAccount)
    };
  }
);

export const unlockUserAccount = createAsyncThunk(
  'users/unlock',
  async (password: string, { rejectWithValue }) => {
    console.log("password: ", password);
    try {
      const serializedLockedPrivateKey = localStorage.getItem("lockedPrivateKey");
      const deserializedLockedPrivateKey = LockedPrivateKey.deserialize(hexToU8a(serializedLockedPrivateKey));
      const userAccount = UserAccount.unlockUserAccount(deserializedLockedPrivateKey, blake2AsU8a(password));
      await userAccount.init();
      return userAccount;
    } catch (e) {
      console.log("error: ", e);
      return rejectWithValue("Something went wrong!");
    }
  }
);

// User slice
interface UserSliceItem {
  userAccount: UserAccount | null;
  error: boolean;
}

const initialState: UserSliceItem = {
  userAccount: null,
  error: false
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    deserializeUserAccount: (state, action: PayloadAction<string>) => {
      const serializedUserAccount = localStorage.getItem("serialziedUserAccount");
      state.userAccount = UserAccount.deserialize(hexToU8a(serializedUserAccount));
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(serializeUserAccount.fulfilled, (state, action) => {
        const {
          serializedUserAccount,
          lockedPrivateKey
        } = action.payload;
        localStorage.setItem("serialziedUserAccount", serializedUserAccount);
        localStorage.setItem("lockedPrivateKey", lockedPrivateKey)
      })

      .addCase(unlockUserAccount.fulfilled, (state, action) => {
        console.log("fulfiled");
        state.error = false;
        state.userAccount = action.payload;
      })
      .addCase(unlockUserAccount.rejected, (state) => {
        console.log('rejected');
        state.error = true;
      })
  }
});

export const { deserializeUserAccount } = userSlice.actions;
export default userSlice.reducer;
