import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAccount } from '@choko-wallet/core';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';

interface UserSliceItem {
  userAccount: UserAccount;
  m12Seeds: string;
  privateKey: Uint8Array;
  serializedUserAccount: Uint8Array
}

const initialState: UserSliceItem = {
  userAccount: new UserAccount({
    hasEncryptedPrivateKeyExported: false,
    keyType: 'sr25519',
    localKeyEncryptionStrategy: 0
  }),
  m12Seeds: undefined,
  privateKey: undefined,
  serializedUserAccount: undefined,
}

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {

    // save userAccount
    seedToUserAccount: (state, action: PayloadAction<string>) => {
      state.m12Seeds = action.payload;
      state.privateKey = mnemonicToMiniSecret(action.payload);

      const userAccount = UserAccount.seedToUserAccount(action.payload, {
        hasEncryptedPrivateKeyExported: false,
        keyType: 'sr25519', // sr25519
        localKeyEncryptionStrategy: 0 // password-v0
      });

      state.userAccount = userAccount;
    },

    // lock userAccount
    lockUserAccount: (state, action: PayloadAction<Uint8Array>) => {
      const userAccount = state.userAccount;
      const lockedPrivateKey = userAccount.lockUserAccount(action.payload);
      state.serializedUserAccount = lockedPrivateKey.serialize();
    },
  }
});

export default userSlice.reducer;