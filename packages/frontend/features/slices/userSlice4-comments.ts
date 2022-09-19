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

    console.log('userAccount-before-init-redux')
    console.log(userAccount)
    // Object { privateKey: Uint8Array(32), keyType: "sr25519", localKeyEncryptionStrategy: 0, hasEncryptedPrivateKeyExported: false, isLocked: false, address: undefined, publicKey: undefined, version: 0 }
    await userAccount.init();//用polkadot的函数通过privateKey生成publicKey和address
    // console.log('userAccount-after-init-redux')
    // console.log(userAccount)//有了isLocked address 和publicKey
    // Object { privateKey: Uint8Array(32), keyType: "sr25519", localKeyEncryptionStrategy: 0, hasEncryptedPrivateKeyExported: false, isLocked: false, address: "5G6X9xTEDLmVTgCWGBMX1YPgp9HXweu39UHbRB8ofzFt6Lo6", publicKey: Uint8Array(32), version: 0 }

    const serialized = userAccount.serialize();//通过publicKey生成36位unit8arr
    // console.log('serialized')
    // console.log(serialized)

    const lockedUserAccount = userAccount.lockUserAccount(blake2AsU8a(password));
    // lockUserAccount函数返回的是object的LockedPrivateKey
    // 通过(passwordHash, this.privateKey); 生成encryptedPrivateKey 再生成object的LockedPrivateKey
    // 执行lock  isLocked = true; 删除privateKey  
    console.log('lockedUserAccount')
    console.log(lockedUserAccount)
    // Object { encryptedPrivateKey: Uint8Array(72), keyType: "sr25519", localKeyEncryptionStrategy: 0, hasEncryptedPrivateKeyExported: false, version: 0 }

    const serializedLockedUserAccount = lockedUserAccount.serialize();
    //这个位置执行的是LockedPrivateKey的函数 serialize()就是把object的内容转成unit8arr 再通过u8aToHex变str
    // console.log('serializedLockedUserAccount')
    // console.log(serializedLockedUserAccount)//76位unit8arr


    return {
      lockedPrivateKey: u8aToHex(serializedLockedUserAccount),
      serializedUserAccount: u8aToHex(serialized)
    };//函数执行完成把这两个变量追加到localStorage
  }
);







// unlockUserAccount 特殊情况解锁 就有了privateKey  有锁时没有privateKey
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
