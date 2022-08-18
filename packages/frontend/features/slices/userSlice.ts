// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserAccount, LockedPrivateKey } from '@choko-wallet/core';
import { u8aToHex, hexToU8a, stringToU8a } from '@skyekiwi/util';

const stringTo32 = (password: string) => {
  let passwordHash = password;
  if (password.length < 32) {
    const curLength = password.length;
    const remainLength = 32 - curLength;
    passwordHash += ' '.repeat(remainLength);
  }
  return passwordHash;
}

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
    const lockedUserAccount = userAccount.lockUserAccount(stringToU8a(stringTo32(password)));
    serializedLockedUserAccount = lockedUserAccount.serialize();

    return {
      serializedUserAccountStr: u8aToHex(serialized),
      lockedPrivateKey: u8aToHex(serializedLockedUserAccount)
    };
  }
);

export const deserializeUserAccount = createAsyncThunk(
  'users/deserialize',
  async (password: string, { rejectWithValue }) => {
    console.log("password: ", password);
    let userAccount;
    try {
      const serializedLockedPrivateKey = localStorage.getItem("lockedPrivateKey");
      const deserializedLockedPrivateKey = LockedPrivateKey.deserialize(hexToU8a(serializedLockedPrivateKey));
      userAccount = UserAccount.unlockUserAccount(deserializedLockedPrivateKey, stringToU8a(stringTo32(password)));
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
  password: string;
  error: boolean;
}

const initialState: UserSliceItem = {
  userAccount: null,
  password: '',
  error: false
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    savePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(serializeUserAccount.fulfilled, (state, action) => {
        const {
          serializedUserAccountStr,
          lockedPrivateKey
        } = action.payload;
        localStorage.setItem("serialziedUserAccountStr", serializedUserAccountStr);
        localStorage.setItem("lockedPrivateKey", lockedPrivateKey)
      })

      .addCase(deserializeUserAccount.fulfilled, (state, action) => {
        console.log("fulfiled");
        state.error = false;
        state.userAccount = action.payload;
      })
      .addCase(deserializeUserAccount.rejected, (state) => {
        console.log('rejected');
        state.error = true;
      })
  }
});

export const { savePassword } = userSlice.actions;
export default userSlice.reducer;
