// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

type UUID = string;
export interface WalletResponseDescriptor {
  isUserConfirmed: boolean;
  isSuccessful: boolean;

  error?: string;
  payload?: Uint8Array;
}

export interface WalletResponse {
  descriptor: WalletResponseDescriptor;
  name: string;

  id: UUID;
}
