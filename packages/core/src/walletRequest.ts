// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DappDescriptor } from '.';

type UUID = string;

export class WalletRequestDescriptor {
  authorizationLevel: 'mandetory' | 'optional';
  origin: DappDescriptor;

  isRemoteRequest: boolean;

  encodedRemotePayload?: Uint8Array;
}

export interface WalletRequest {
  descriptor: WalletRequestDescriptor;
  name: string;
  id: UUID;
}
