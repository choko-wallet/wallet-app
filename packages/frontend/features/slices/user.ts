// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { AccountOption, UserAccount } from '@choko-wallet/core';

/**
 * Wallet core account storage
 */

/**
 * Add an account to storage
 * There are two this can be done
 *
 * @First option: AccountOption + seed: mnemonic + password: string
 * password is an user input password
 * @Second use importKey which should always be an UserAccount.serializeWithEncryptedKey()
 */

// humor cook snap sunny ticket distance leaf unusual join business obey below
export const addUserAccount = createAsyncThunk(
  'users/add',
  async (payload: {
    option?: AccountOption;
    seeds?: string;
    password?: string;
    importKey?: Uint8Array;
  }, { rejectWithValue }) => {
    const { importKey, option, password, seeds } = payload;

    if (seeds) {
      let accountOption = option;

      if (!accountOption) {
        accountOption = new AccountOption({
          hasEncryptedPrivateKeyExported: false,
          localKeyEncryptionStrategy: 1
        });
      }
      const userAccount = new UserAccount(accountOption);
      userAccount.unlock(seeds);
      await userAccount.init();
      userAccount.encryptUserAccount(blake2AsU8a(password));

      return userAccount;
    } else if (importKey) {
      try {
        const userAccount = UserAccount.deserializeWithEncryptedKey(importKey);

        userAccount.option.hasEncryptedPrivateKeyExported = true;

        return userAccount;
      } catch (e) {
        return rejectWithValue('invalid serialized userAccount with encrypted key');
      }
    } else {
      // unreachable!
      return rejectWithValue('at least pass on either seeds or importKey');
    }
  }
);

// User slice
interface UserSliceItem {
  userAccount: UserAccount[];
  currentUserAccount: UserAccount | null;
  currentUserAccountIndex: number;
}

const initialState: UserSliceItem = {
  currentUserAccount: null,
  currentUserAccountIndex: 0,
  userAccount: [],
};

/* eslint-disable sort-keys */
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    noteAAWalletAddress: (state, action: PayloadAction<string[]>) => {
      const userAccountLength = action.payload.length;
      for (let i = 0; i < userAccountLength; i ++) {
        state.userAccount[i].aaWalletAddress = action.payload[i];
      }
      state.currentUserAccount.aaWalletAddress = action.payload[state.currentUserAccountIndex];
    },
    loadUserAccount: (state) => {
      try {
        const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));

        let offset = 0;
        let accountIndex = 0;
        const serializedLength = UserAccount.serializedLengthWithEncryptedKey();

        while (offset < serializedUserAccount.length) {
          const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);

          offset += serializedLength;
          const account = UserAccount.deserializeWithEncryptedKey(currentSerializedUserAccount);
          state.userAccount[accountIndex] = account
          accountIndex ++;
        }
        state.currentUserAccount = state.userAccount[0];
        state.currentUserAccountIndex = 0;
      } catch (e) {
        console.log('error', e);
        localStorage.removeItem('serialziedUserAccount');
        state.currentUserAccount = null;
        state.currentUserAccountIndex = 0;
        state.userAccount = [];
      }
    },
    // Use with caution! Always lock the account when done.
    decryptCurrentUserAccount: (state, action: PayloadAction<string>) => {
      state.currentUserAccount.decryptUserAccount(blake2AsU8a(action.payload));
    },

    lockCurrentUserAccount: (state) => {
      if (state.currentUserAccount) {
        state.currentUserAccount.lock();
      }
    },

    switchUserAccount: (state, action: PayloadAction<number>) => {
      if (state.userAccount[action.payload] !== undefined) {
        state.currentUserAccount = state.userAccount[action.payload];
        state.currentUserAccountIndex = action.payload;
      }
    },

    removeAllAccounts: (state) => {
      localStorage.removeItem('serialziedUserAccount');

      state.currentUserAccount = null;
      state.userAccount = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAccount.fulfilled, (state, action) => {
        const userAccount = action.payload;

        console.log(userAccount);
        const maybeCurrentSerializedAccount = localStorage.getItem('serialziedUserAccount');

        if (maybeCurrentSerializedAccount) {
          let offset = 0;
          const len = UserAccount.serializedLengthWithEncryptedKey() * 2;// 109  * 2

          while (offset < maybeCurrentSerializedAccount.length) {
            const currentSerializedAccount = maybeCurrentSerializedAccount.slice(offset, offset + len);
            const account = UserAccount.deserializeWithEncryptedKey(hexToU8a(currentSerializedAccount));

            offset += len;

            // Here we only care about the first publicKey 
            // might need to be changed later
            if (account.publicKeys[0] === userAccount.publicKeys[0]) {
              throw new Error('User Account Already Exists');
            }
          }
        }

        const localStorageContent = maybeCurrentSerializedAccount || '';

        localStorage.setItem('serialziedUserAccount', localStorageContent + u8aToHex(userAccount.serializeWithEncryptedKey()));
      });
  }
});

export const { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, removeAllAccounts, switchUserAccount, noteAAWalletAddress } = userSlice.actions;
export default userSlice.reducer;
