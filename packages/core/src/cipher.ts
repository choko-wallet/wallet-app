// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Version } from './types';

export class Cipher {
  cipherText: Uint8Array;
  curve: number; // 'x25519' | 'ed25519' | 'secp256k1' | 'sr25519';

  version: Version;

  ephemeralReceiverPublicKey?: Uint8Array; // len = 32; use x25519 only
}
