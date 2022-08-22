// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { LockedPrivateKey, UserAccount } from '@choko-wallet/core';

interface AddAccountPayload {
  seeds: string;
  password: string;
}

interface UnlockAccountPayload {
  address: string;
  password: string;
}

export const addUserAccount = createAsyncThunk(
  'users/add',
  async (payload: AddAccountPayload) => {
    const { password, seeds } = payload;

    const userAccount = UserAccount.seedToUserAccount(seeds, {
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519',
      localKeyEncryptionStrategy: 0
    });

    await userAccount.init();

    const serialized = userAccount.serialize();
    const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));

    const serializedLockedUserAccount = lockedUserAccount.serialize();

    return {
      lockedPrivateKey: u8aToHex(serializedLockedUserAccount),
      serializedUserAccount: u8aToHex(serialized)
    };
  }
);

export const unlockUserAccount = createAsyncThunk(
  'users/unlock',
  async (payload: UnlockAccountPayload, { rejectWithValue }) => {
    const { address, password } = payload;

    const serializedLockedPrivateKey = hexToU8a(localStorage.getItem('lockedPrivateKey'));

    let offsetLockedKey = 0;
    const perLockedPrivateKeyLength = LockedPrivateKey.serializedLength();

    while (offsetLockedKey < serializedLockedPrivateKey.length) {
      const lockedKey = serializedLockedPrivateKey.slice(offsetLockedKey, offsetLockedKey + perLockedPrivateKeyLength);
      const lockedPrivateKey = LockedPrivateKey.deserialize(lockedKey);

      try {
        const userAccount = UserAccount.unlockUserAccount(lockedPrivateKey, blake2AsU8a(password));

        await userAccount.init();

        if (userAccount.address === address) {
          return userAccount;
        }
      } catch (e) {
        // wrong key tried
        // pass
      }

      offsetLockedKey += perLockedPrivateKeyLength;
    }

    return rejectWithValue('User Account not found');
  }
);

// User slice
interface UserSliceItem {
  error: string;
  userAccount: {[key: string]: UserAccount};
}

const initialState: UserSliceItem = {
  error: '',
  userAccount: {}
};

/* eslint-disable sort-keys */
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loadUserAccount: (state, _: PayloadAction<string>) => {
      const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));

      let offset = 0;
      const serializedLength = UserAccount.serializedLength();

      while (offset < serializedUserAccount.length) {
        const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);

        offset += serializedLength;

        const account = UserAccount.deserialize(currentSerializedUserAccount);

        state.userAccount[account.address] = account;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addUserAccount.fulfilled, (state, action) => {
        const { lockedPrivateKey,
          serializedUserAccount } = action.payload;

        const maybeCurrentSerializedAccount = localStorage.getItem('serialziedUserAccount');
        const maybeCurrentlockedPrivateKey = localStorage.getItem('lockedPrivateKey');

        const currentSerializedAccount = maybeCurrentSerializedAccount || '';
        const currentlockedPrivateKey = maybeCurrentlockedPrivateKey || '';

        localStorage.setItem('serialziedUserAccount', currentSerializedAccount + serializedUserAccount);
        localStorage.setItem('lockedPrivateKey', currentlockedPrivateKey + lockedPrivateKey);
      })

      .addCase(unlockUserAccount.fulfilled, (state, action) => {
        console.log('fulfiled');
        state.error = '';

        state.userAccount[action.payload.address] = action.payload;
      })
      .addCase(unlockUserAccount.rejected, (state, action) => {
        console.log('rejected');
        state.error = 'Invalid password!';
      });
  }
});

export const { loadUserAccount } = userSlice.actions;
export default userSlice.reducer;
