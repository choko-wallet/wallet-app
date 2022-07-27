// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicToMiniSecret, mnemonicValidate } from '@polkadot/util-crypto';

import { SymmetricEncryption } from '@skyekiwi/crypto';

import { CURRENT_VERSION, KeypairType, Version } from './types';
import * as Util from './util';
import { DappDescriptor } from '.';

export interface AccountCreationOption {
  keyType: KeypairType;
  localKeyEncryptionStrategy: number;
  hasEncryptedPrivateKeyExported: boolean;
}

export class UserAccount {
  // CORE FIELDS
  privateKey?: Uint8Array;

  keyType: KeypairType;
  localKeyEncryptionStrategy: number; // 1='password-v0' | 2='webauthn';
  hasEncryptedPrivateKeyExported: boolean;
  // whether the user had exported the private key to email
  // set to be true when
  //      1. the account is imported from unencrypted private key link
  //      2. the account has click the link to export private key via link to email

  // DERIVED
  isLocked: boolean;
  address: string;
  publicKey: Uint8Array; // len == 32 for curve25519 family | len == 33 for secp256k1

  // VERSION FIELD
  version: Version;

  constructor (config: {
    keyType: KeypairType,
    localKeyEncryptionStrategy: number,
    hasEncryptedPrivateKeyExported: boolean,
  }) {
    const { hasEncryptedPrivateKeyExported, keyType, localKeyEncryptionStrategy } = config;

    if (!keyType) {
      throw new Error('unkonwn key type - UserAccount.constructor');
    }

    if (localKeyEncryptionStrategy < 0 || localKeyEncryptionStrategy > 2) {
      throw new Error('unkonwn local key encryption strategy - UserAccount.constructor');
    }

    this.keyType = keyType;
    this.localKeyEncryptionStrategy = localKeyEncryptionStrategy;
    this.hasEncryptedPrivateKeyExported = hasEncryptedPrivateKeyExported;
    this.version = CURRENT_VERSION;
    this.isLocked = true;
  }

  public lock (): void {
    delete this.privateKey;
    this.isLocked = true;
  }

  public unlock (privateKey: Uint8Array): void {
    if (privateKey.length !== 32) {
      throw new Error('invalid private key length - UserAccount.unlock');
    }

    this.privateKey = privateKey;
    this.isLocked = false;
  }

  public async init (): Promise<void> {
    if (this.isLocked) {
      throw new Error('account is locked - UserAccount.init');
    }

    await cryptoWaitReady();

    const kr = (new Keyring({
      type: this.keyType
    })).addFromSeed(this.privateKey);

    this.address = kr.address;
    this.publicKey = kr.publicKey;
  }

  public async signMessage (message: Uint8Array): Promise<Uint8Array> {
    if (this.isLocked) {
      throw new Error('account is locked - UserAccount.signMessage');
    }

    await cryptoWaitReady();

    const kr = (new Keyring({
      type: this.keyType
    })).addFromSeed(this.privateKey);

    return kr.sign(message);
  }

  public static seedToUserAccount (seed: string, option: AccountCreationOption): UserAccount {
    if (!mnemonicValidate(seed)) {
      throw new Error('invalid seed - UserAccount.seedToUserAccount');
    }

    const privateKey = mnemonicToMiniSecret(seed);

    if (privateKey.length !== 32) {
      // sanity check
      throw new Error('invalid private key length - UserAccount.seedToUserAccount');
    }

    const userAccount = new UserAccount({
      hasEncryptedPrivateKeyExported: option.hasEncryptedPrivateKeyExported,

      keyType: option.keyType,

      localKeyEncryptionStrategy: option.localKeyEncryptionStrategy
    });

    userAccount.unlock(privateKey, option.keyType);

    return userAccount;
  }

  public static lockUserAccount (userAccount: UserAccount, passwordHash: Uint8Array): LockedPrivateKey {
    if (userAccount.isLocked) {
      throw new Error('account has been locked locked - UserAccount.lockUserAccount');
    }

    if (passwordHash.length !== 32) {
      throw new Error('invalid password hash length - UserAccount.lockUserAccount');
    }

    const encryptedPrivateKey = SymmetricEncryption.encrypt(passwordHash, userAccount.privateKey);

    // original key size + encryption overhead + nonce
    if (encryptedPrivateKey.length !== 32 + 16 + 24) {
      throw new Error('invalid encrypted private key length - UserAccount.lockUserAccount');
    }

    userAccount.lock();

    return {
      encryptedPrivateKey: encryptedPrivateKey,

      hasEncryptedPrivateKeyExported: userAccount.hasEncryptedPrivateKeyExported,

      keyType: userAccount.keyType,

      localKeyEncryptionStrategy: 0
    };
  }

  public static unlockUserAccount (lockedPrivateKey: LockedPrivateKey, passwordHash: Uint8Array): UserAccount {
    if (lockedPrivateKey.encryptedPrivateKey.length !== 32 + 16 + 24) {
      throw new Error('invalid encrypted private key length - UserAccount.unlockUserAccount');
    }

    if (passwordHash.length !== 32) {
      throw new Error('invalid password hash length - UserAccount.unlockUserAccount');
    }

    const privateKey = SymmetricEncryption.decrypt(passwordHash, lockedPrivateKey.encryptedPrivateKey);

    if (privateKey.length !== 32) {
      throw new Error('invalid private key length - UserAccount.unlockUserAccount');
    }

    const userAccount = new UserAccount({
      hasEncryptedPrivateKeyExported: lockedPrivateKey.hasEncryptedPrivateKeyExported,

      keyType: lockedPrivateKey.keyType,

      localKeyEncryptionStrategy: lockedPrivateKey.localKeyEncryptionStrategy
    });

    userAccount.unlock(privateKey, Util.mapKeyTypeToKeypairType(lockedPrivateKey.keyType));

    return userAccount;
  }

  // Account Serde & Account Index 

  //   public async signAndSendTransaction()

  //   public async decryptMessage(
  //       message: Uint8Array,
  //       publicKey: Uint8Array,
  //       keyType: KeypairType
  //   ): Promise<Uint8Array> {

//   }
}

export interface AccountBalance {
  freeBalance: string;
  lockedBalance: string;
}

export interface UserAccountInfo extends UserAccount {
  // derived fields
  balance?: AccountBalance;
  connectedDapps?: DappDescriptor[];
  // ....

  version: Version,
}

export interface LockedPrivateKey {
  encryptedPrivateKey: Uint8Array; // fixed size = 32 bytes + 24 bytes nonce + 16 bytes overhead
  keyType: KeypairType; // 'sr25519' | 'ed25519' | 'secp256k1';

  localKeyEncryptionStrategy: number; // 'password-v0' | 'webauthn';
  hasEncryptedPrivateKeyExported: boolean;
}
