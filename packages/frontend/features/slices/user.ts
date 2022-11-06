// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a, ethereumEncode } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { AccountOption, UserAccount } from '@choko-wallet/core';

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
          keyType: 'sr25519',
          localKeyEncryptionStrategy: 1
        });
      }

      const userAccount = UserAccount.seedToUserAccount(seeds, accountOption);

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

export const changeCurrentAccountType = createAsyncThunk(
  'users/changeCurrentAccountType',
  async (payload: {
    option: AccountOption,
    userAccount: UserAccount,
  }) => {
    const { option, userAccount } = payload;

    userAccount.option = option;
    await userAccount.init();

    return userAccount;
  }
);

// User slice
interface UserSliceItem {
  error: string;
  userAccount: { [key: string]: UserAccount };
  currentUserAccount: UserAccount | null;
  changeCurrentAccountLoading: boolean;

}

const initialState: UserSliceItem = {
  changeCurrentAccountLoading: false,
  currentUserAccount: null,
  error: '',
  userAccount: {}
};

/* eslint-disable sort-keys */
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loadUserAccount: (state) => {
      try {
        const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));

        let offset = 0;
        const serializedLength = UserAccount.serializedLengthWithEncryptedKey();

        while (offset < serializedUserAccount.length) {
          const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);

          offset += serializedLength;
          const account = UserAccount.deserializeWithEncryptedKey(currentSerializedUserAccount);

          state.userAccount[account.address] = account;
        }

        state.currentUserAccount = state.userAccount[Object.keys(state.userAccount)[0]];
      } catch (e) {
        console.log('error', e);
        localStorage.clear();
        state.currentUserAccount = null;
        state.userAccount = {};
        state.error = '';
      }
    },

    decryptCurrentUserAccount: (state, action: PayloadAction<string>) => {
      console.log(state.currentUserAccount, action.payload);
      state.currentUserAccount.decryptUserAccount(blake2AsU8a(action.payload));
    },

    lockCurrentUserAccount: (state) => {
      if (state.currentUserAccount) {
        state.currentUserAccount.lock();
      }
    },

    switchUserAccount: (state, action: PayloadAction<string>) => {
      if (state.userAccount[action.payload] !== undefined) {
        state.currentUserAccount = state.userAccount[action.payload];
      }
    },

    removeAllAccounts: (state) => {
      localStorage.removeItem('serialziedUserAccount');

      state.currentUserAccount = null;
      state.userAccount = {};
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAccount.fulfilled, (state, action) => {
        const userAccount = action.payload;

        const maybeCurrentSerializedAccount = localStorage.getItem('serialziedUserAccount');

        if (maybeCurrentSerializedAccount) {
          console.log('maybeCurrentSerializedAccount', maybeCurrentSerializedAccount);
          console.log('maybeCurrentSerializedAccount.length', maybeCurrentSerializedAccount.length);// 218

          let offset = 0;
          const len = UserAccount.serializedLengthWithEncryptedKey() * 2;// 109  * 2

          while (offset < maybeCurrentSerializedAccount.length) {
            const currentSerializedAccount = maybeCurrentSerializedAccount.slice(offset, offset + len);

            console.log('currentSerializedAccount', currentSerializedAccount);

            const account = UserAccount.deserializeWithEncryptedKey(hexToU8a(currentSerializedAccount));

            offset += len;

            if (account.address === userAccount.address) {
              state.error = 'account already existed';

              return;
            }
          }
        }

        const localStorageContent = maybeCurrentSerializedAccount || '';

        localStorage.setItem('serialziedUserAccount', localStorageContent + u8aToHex(userAccount.serializeWithEncryptedKey()));
        state.error = 'none';
      })
      .addCase(addUserAccount.rejected, (state, action) => {
        state.error = (action.error ? action.error : 'Invalid password!') as string;
      })

      .addCase(changeCurrentAccountType.fulfilled, (state, action) => {
        const userAccount = action.payload;
        const maybeCurrentSerializedAccount = localStorage.getItem('serialziedUserAccount');
        let newLocalStorageContent = '';

        if (maybeCurrentSerializedAccount) {
          let offset = 0;
          const len = UserAccount.serializedLengthWithEncryptedKey();

          while (offset < maybeCurrentSerializedAccount.length) {
            const currentSerializedAccount = maybeCurrentSerializedAccount.slice(offset, offset + len);
            const account = UserAccount.deserializeWithEncryptedKey(hexToU8a(currentSerializedAccount));

            offset += len;

            if (account.address === userAccount.address) {
              newLocalStorageContent += u8aToHex(userAccount.serializeWithEncryptedKey());
            } else {
              newLocalStorageContent += u8aToHex(account.serializeWithEncryptedKey());
            }
          }
        }

        state.currentUserAccount = userAccount;
        localStorage.setItem('serialziedUserAccount', newLocalStorageContent);
      })
      .addCase(changeCurrentAccountType.rejected, (state, action) => {
        // unexpected;
        state.error = (action.error ? action.error : 'unexpected!') as string;
      });
  }
});

export const { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, removeAllAccounts, switchUserAccount } = userSlice.actions;
export default userSlice.reducer;
