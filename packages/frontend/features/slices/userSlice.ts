// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { AccountOption, UserAccount } from '@choko-wallet/core';

export const addUserAccount = createAsyncThunk(//必须有seeds和password, importKey是可选
  'users/add',
  async (payload: {
    option?: AccountOption;
    seeds?: string;//seeds 是可选
    password: string;
    importKey?: Uint8Array;
  }, { rejectWithValue }) => {
    const { password, seeds, option, importKey } = payload;

    if (seeds) {
      let accountOption = option;
      if (!accountOption) {
        accountOption = new AccountOption({
          keyType: 'sr25519',
          localKeyEncryptionStrategy: 1,
          hasEncryptedPrivateKeyExported: false,
        })
      }

      const userAccount = UserAccount.seedToUserAccount(seeds, accountOption);
      await userAccount.init();
      // console.log('userAccount', userAccount)
      userAccount.encryptUserAccount(blake2AsU8a(password));//增加encryptedPrivateKey属性
      // console.log('userAccount1', userAccount)

      return userAccount;
    } else if (importKey) {//不用password啊
      try {
        console.log('redux01')
        const userAccount = UserAccount.deserializeWithEncryptedKey(importKey);
        console.log('redux02')
        await userAccount.init();
        console.log('redux03')
        userAccount.option.hasEncryptedPrivateKeyExported = true;

        return userAccount;
      } catch (e) {
        return rejectWithValue("invalid serialized userAccount with encrypted key");
      }
    } else {
      // unreachable!
      return rejectWithValue("at least pass on either seeds or importKey");
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
  currentUserAccount: UserAccount | null;//type没有 [key: string]:
}

const initialState: UserSliceItem = {
  error: '',
  userAccount: {},
  currentUserAccount: null,
};

/* eslint-disable sort-keys */
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loadUserAccount: (state, _: PayloadAction<string>) => {
      const serializedUserAccount = hexToU8a(localStorage.getItem('serialziedUserAccount'));

      let offset = 0;
      const serializedLength = UserAccount.serializedLengthWithEncryptedKey();

      while (offset < serializedUserAccount.length) {
        const currentSerializedUserAccount = serializedUserAccount.slice(offset, offset + serializedLength);
        offset += serializedLength;
        const account = UserAccount.deserializeWithEncryptedKey(currentSerializedUserAccount);

        state.userAccount[account.address] = account;
      }
      // set the first account 应该是last吧 最新引入的在最后 这个位置可改成引入账户时 把useraccount放到初始 localstorage也是
      state.currentUserAccount = state.userAccount[Object.keys(state.userAccount)[0]];
    },

    decryptCurrentUserAccount: (state, action: PayloadAction<string>) => {
      if (state.currentUserAccount) {
        state.currentUserAccount.decryptUserAccount(blake2AsU8a(action.payload));
      }
    },

    lockCurrentUserAccount: (state, action: PayloadAction<null>) => {
      if (state.currentUserAccount) {
        state.currentUserAccount.lock();
      }
    },

    switchUserAccount: (state, action: PayloadAction<string>) => {
      console.log('action.payload', action.payload)
      // console.log('action.payload',action.payload)

      state.currentUserAccount = state.userAccount[action.payload];
    },

    removeAllAccounts: (state, _: PayloadAction<null>) => {
      // localStorage.removeItem('serializedUserAccount');//清除不掉
      localStorage.clear();

      console.log('local', localStorage.getItem('serialziedUserAccount'))
      state.currentUserAccount = null;
      state.userAccount = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAccount.fulfilled, (state, action) => {//判断在fullfilled
        const userAccount = action.payload;
        const maybeCurrentSerializedAccount = localStorage.getItem('serialziedUserAccount');
        if (maybeCurrentSerializedAccount) {
          console.log('maybeCurrentSerializedAccount', maybeCurrentSerializedAccount)
          console.log('maybeCurrentSerializedAccount.length', maybeCurrentSerializedAccount.length)//218

          let offset = 0;
          const len = UserAccount.serializedLengthWithEncryptedKey() * 2;//109  * 2
          console.log('len', len)

          while (offset < maybeCurrentSerializedAccount.length) {

            const currentSerializedAccount = maybeCurrentSerializedAccount.slice(offset, offset + len);
            console.log('currentSerializedAccount', currentSerializedAccount)

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
      })
  }
});

export const { loadUserAccount, decryptCurrentUserAccount, lockCurrentUserAccount, switchUserAccount, removeAllAccounts } = userSlice.actions;
export default userSlice.reducer;
