// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Base Types
export type Version = number;
export type Color = string;
export type Image = Uint8Array;
export type Hash = Uint8Array;

export declare type HexString = string;
export declare type AccountBalance = number;
export declare type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';

const CURRENT_VERSION = 0;

export { CURRENT_VERSION };
