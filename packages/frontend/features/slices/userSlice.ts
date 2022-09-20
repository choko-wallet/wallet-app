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

interface AddAccountFromUrlPayload {
  privateKey: Uint8Array;
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

    console.log('redux-userAccount', userAccount.address)

    const serialized = userAccount.serialize();
    const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
    const serializedLockedUserAccount = lockedUserAccount.serialize();


    // 存在账户 且和导入的地址一致 返回空值 
    if (localStorage.getItem('serialziedUserAccount') !== null) {
      const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));
      let offset = 0;
      const serializedLength = UserAccount.serializedLength();
      while (offset < serializedUserAccount.length) {
        const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);
        offset += serializedLength;
        const account = UserAccount.deserialize(currentSerializedUserAccount);
        if (account.address == userAccount.address) {
          console.log('account already exists');
          return {
            lockedPrivateKey: '',
            serializedUserAccount: ''
          };
        }
      }
    }


    return {
      lockedPrivateKey: u8aToHex(serializedLockedUserAccount),
      serializedUserAccount: u8aToHex(serialized)
    };
  }
);

export const addUserAccountFromUrl = createAsyncThunk(
  'users/addFromUrl',
  async (payload: AddAccountFromUrlPayload) => {
    const { privateKey, password } = payload;

    const userAccount = UserAccount.privateKeyToUserAccount(privateKey, {
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519',
      localKeyEncryptionStrategy: 0
    });

    await userAccount.init();

    console.log('redux-userAccount', userAccount.address)

    const serialized = userAccount.serialize();
    const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
    const serializedLockedUserAccount = lockedUserAccount.serialize();


    // 存在账户 且和导入的地址一致 返回空值 
    if (localStorage.getItem('serialziedUserAccount') !== null) {
      const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));
      let offset = 0;
      const serializedLength = UserAccount.serializedLength();
      while (offset < serializedUserAccount.length) {
        const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);
        offset += serializedLength;
        const account = UserAccount.deserialize(currentSerializedUserAccount);
        if (account.address == userAccount.address) {
          console.log('account already exists');
          return {
            lockedPrivateKey: '',
            serializedUserAccount: ''
          };
        }
      }
    }


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
  userAccount: { [key: string]: UserAccount };
  currentUserAccount: { [key: string]: UserAccount };
}

const initialState: UserSliceItem = {
  error: '',
  userAccount: {},
  currentUserAccount: {},
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
        state.currentUserAccount = {};//只保留最后一个 作为当前账户
        state.currentUserAccount[account.address] = account;

      }
    },

    switchUserAccount: (state, action: PayloadAction<UserAccount>) => {
      console.log('action.payload', action.payload.address)
      state.currentUserAccount = {};
      state.currentUserAccount[action.payload.address] = action.payload;
    },

    removeAllAccounts: (state, _: PayloadAction<string>) => {
      localStorage.clear()
      state.currentUserAccount = {};
      state.userAccount = {};
      state.error = '';
      console.log('removeAllAccounts-localStorage', localStorage)
      console.log('state.currentUserAccount', state.currentUserAccount)
      console.log('state.userAccount', state.userAccount)


    },
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

      .addCase(addUserAccountFromUrl.fulfilled, (state, action) => {
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

export const { loadUserAccount, switchUserAccount, removeAllAccounts } = userSlice.actions;
export default userSlice.reducer;
