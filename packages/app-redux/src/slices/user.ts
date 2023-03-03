// Copyright 2021-2022 @choko-wallet/app-redux authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { AccountOption, UserAccount } from '@choko-wallet/core';
import { mpcLocalKeyToAccount } from '@choko-wallet/mpc';

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
 * @Third MPC Account
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
  mpcUserAccountIndex: number;
}

const initialState: UserSliceItem = {
  currentUserAccount: null,
  currentUserAccountIndex: -1, // keep track of the current usere
  mpcUserAccountIndex: -1, // keep track of which account is the mpc wallet addr
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
      const mpcKey = localStorage.getItem('mpcKey');

      let allAccounts: UserAccount[] = [];

      // User land
      // 1. we first try to load the mpc account - mpc account is always the first account
      if (mpcKey && mpcKey !== 'null') {
        // we have an MPC account
        allAccounts.push(mpcLocalKeyToAccount(mpcKey));
        state.mpcUserAccountIndex = 0;
        state.currentUserAccountIndex = 0;
      } else if (rawSerializedUserAccount && rawSerializedUserAccount !== 'null') {
        // 2. then we try to load local accounts
        allAccounts = [
          ...allAccounts, 
          ...parseUserAccount(hexToU8a(rawSerializedUserAccount))
        ];
      } else {
        // we have non-account avalaible 
        return
      }

      // if we are here - that means there must be some account there
      state.userAccount = allAccounts;
      state.currentUserAccount = allAccounts[0];

      // AA Wallet land
      if (aaWalletCache && aaWalletCache.length !== 0) {
        const aaWalletAddresses = parseAAWalletCache(aaWalletCache);

        for (let i = 0; i < aaWalletAddresses.length; ++ i) {
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
    },
    noteMpcUserAccount: (_state, action: PayloadAction<string>) => {
      const localKey = action.payload;
      localStorage.setItem("mpcKey", localKey);
    },
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

export const { noteMpcUserAccount, decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount } = userSlice.actions;
export default userSlice.reducer;
