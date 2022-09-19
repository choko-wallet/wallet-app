// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { LockedPrivateKey, UserAccount } from '@choko-wallet/core';

interface AddAccountPayload {
  seeds: string;
  password: string;
  privateKey: Uint8Array;
  lockedPrivateKey: LockedPrivateKey;
}


export const addUserAccount = createAsyncThunk(
  'users/add',
  async (payload: AddAccountPayload) => {

    const { password, seeds, privateKey, lockedPrivateKey } = payload;

    let userAccount: UserAccount;
    if (seeds) {
      userAccount = UserAccount.seedToUserAccount(seeds, {
        hasEncryptedPrivateKeyExported: false,
        keyType: 'sr25519',
        localKeyEncryptionStrategy: 0
      });

      await userAccount.init();
      const serialized = userAccount.serialize();//通过publicKey生成36位unit8arr
      const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
      const serializedLockedUserAccount = lockedUserAccount.serialize();
      return {
        lockedPrivateKey: u8aToHex(serializedLockedUserAccount),
        serializedUserAccount: u8aToHex(serialized)
      };


    } else if (privateKey) {
      userAccount = UserAccount.privateKeyToUserAccount(privateKey, {
        hasEncryptedPrivateKeyExported: false,
        keyType: 'sr25519',
        localKeyEncryptionStrategy: 0
      });

      await userAccount.init();
      const serialized = userAccount.serialize();//通过publicKey生成36位unit8arr
      const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
      const serializedLockedUserAccount = lockedUserAccount.serialize();
      return {
        lockedPrivateKey: u8aToHex(serializedLockedUserAccount),
        serializedUserAccount: u8aToHex(serialized)
      };


      // unlockUserAccount 特殊情况解锁 就有了privateKey  有锁时没有privateKey
    } else if (lockedPrivateKey) {
      try {
        userAccount = UserAccount.unlockUserAccount(lockedPrivateKey, blake2AsU8a(password));
        await userAccount.init();
        return userAccount;
      } catch (e) {
        // error 各种情况err还要处理下 给到state 还有return rejectWithValue('User Account not found');
        // wrong key tried
        // pass
      }

    }
  }
);



// User slice
interface UserSliceItem {
  error: string;
  userAccount: { [key: string]: UserAccount };
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
    // loadUserAccount把localStorage的账户信息转到redux的state 组件通过useSelector(selectUserAccount)拿到
    loadUserAccount: (state, _: PayloadAction<string>) => {
      const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));

      let offset = 0;
      const serializedLength = UserAccount.serializedLength();//36
      console.log('serializedLength')
      console.log(serializedLength)

      while (offset < serializedUserAccount.length) {
        const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);

        offset += serializedLength;

        const account = UserAccount.deserialize(currentSerializedUserAccount);
        //从localstorage拿出来 截取 再deserialize 再给redux是state
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

    // .addCase(unlockUserAccount.fulfilled, (state, action) => {
    //   console.log('fulfiled');
    //   state.error = '';

    //   state.userAccount[action.payload.address] = action.payload;
    // })
    // .addCase(unlockUserAccount.rejected, (state, action) => {
    //   console.log('rejected');
    //   state.error = 'Invalid password!';
    // });
  }
});

export const { loadUserAccount } = userSlice.actions;
export default userSlice.reducer;
