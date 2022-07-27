// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { CURRENT_VERSION, KeypairType, Version } from './types';
import * as Util from './util';
import { DappDescriptor } from '.';

export class UserAccount {
  // CORE FIELDS
  privateKey?: Uint8Array;

  keyType: number;
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
    keyType: number,
    localKeyEncryptionStrategy: number,
    hasEncryptedPrivateKeyExported: boolean,
  }) {
    const { hasEncryptedPrivateKeyExported, keyType, localKeyEncryptionStrategy } = config;

    if (keyType <= 0 || keyType > 4) {
      throw new Error('unkonwn key type - UserAccount.constructor');
    }

    if (localKeyEncryptionStrategy <= 0 || localKeyEncryptionStrategy > 2) {
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

  // privateKey needs to be consistent with `this.keyType`
  public unlock (privateKey: Uint8Array, keyType?: KeypairType): void {
    if (privateKey.length !== 32) {
      throw new Error('invalid private key length - UserAccount.unlock');
    }

    if (keyType) {
      this.keyType = Util.mapKeypairTypeToNumber(keyType);
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
      type: Util.mapKeyTypeToKeypairType(this.keyType)
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
      type: Util.mapKeyTypeToKeypairType(this.keyType)
    })).addFromSeed(this.privateKey);

    return kr.sign(message);
  }

  // public async decryptMessage(
  //     message: Uint8Array,
  //     publicKey: Uint8Array,
  //     keyType: KeypairType
  // ): Promise<Uint8Array> {

  // }
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
  keyType: 'sr25519' | 'ed25519' | 'secp256k1';

  localKeyEncryptionStrategy: 'password-v0' | 'webauthn';
  hasEncryptedPrivateKeyExported: boolean;
}
