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
const parseUserAccount = (rawData: Uint8Array): UserAccount[] => {
  let offset = 0;
  let accountIndex = 0;
  const serializedLength = UserAccount.serializedLengthWithEncryptedKey();
  const res = [];

  while (offset < rawData.length) {
    const currentSerializedUserAccount = rawData.slice(offset, offset + serializedLength);

    offset += serializedLength;
    const account = UserAccount.deserializeWithEncryptedKey(currentSerializedUserAccount);

    res[accountIndex] = account;
    accountIndex++;
  }

  return res;
};

const parseAAWalletCache = (rawData: string): string[] => {
  let offset = 0;
  let accountIndex = 0;
  const res = [];

  while (offset < rawData.length) {
    res[accountIndex] = rawData.slice(offset, offset + 42);
    offset += 42;
    accountIndex++;
  }

  return res;
};

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
  userAccount: []
};

/* eslint-disable sort-keys */
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    noteAAWalletAddress: (state, action: PayloadAction<string[]>) => {
      const userAccountLength = action.payload.length;

      for (let i = 0; i < userAccountLength; i++) {
        state.userAccount[i].aaWalletAddress = action.payload[i];
      }

      state.currentUserAccount.aaWalletAddress = action.payload[state.currentUserAccountIndex];
      localStorage.setItem('AAWalletCache', action.payload.join(''));
    },
    loadUserAccount: (state) => {
      const rawSerializedUserAccount = localStorage.getItem('serialziedUserAccount');
      const aaWalletCache = localStorage.getItem('AAWalletCache');

      // User land
      if (!rawSerializedUserAccount || rawSerializedUserAccount === 'null') {
        throw new Error('empty localStorage for serializedUserAccount');
      }

      state.userAccount = parseUserAccount(hexToU8a(rawSerializedUserAccount));
      state.currentUserAccount = state.userAccount[0];
      state.currentUserAccountIndex = 0;

      // AA Wallet land
      if (aaWalletCache && aaWalletCache.length !== 0) {
        const aaWalletAddresses = parseAAWalletCache(aaWalletCache);

        for (let i = 0; i < aaWalletAddresses.length; ++i) {
          state.userAccount[i].aaWalletAddress = aaWalletAddresses[i];
        }
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
      localStorage.removeItem('AAWalletCache');

      state.currentUserAccount = null;
      state.userAccount = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAccount.fulfilled, (state, action) => {
        const userAccount = action.payload;

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
            if (account.getAddress('ethereum') === userAccount.getAddress('ethereum')) {
              throw new Error('User Account Already Exists');
            }
          }
        }

        const localStorageContent = maybeCurrentSerializedAccount || '';

        localStorage.setItem('serialziedUserAccount', localStorageContent + u8aToHex(userAccount.serializeWithEncryptedKey()));

        // store the AA cache
        let aaWalletCache = localStorage.getItem('AAWalletCache');

        if (!aaWalletCache || aaWalletCache.length === 0) {
          // first account
          aaWalletCache = '';
        }

        aaWalletCache = aaWalletCache + userAccount.aaWalletAddress;

        localStorage.setItem('AAWalletCache', aaWalletCache);
      });
  }
});

export const { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount } = userSlice.actions;
export default userSlice.reducer;
