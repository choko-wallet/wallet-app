// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */
import { secureGenerateRandomKey } from '@skyekiwi/crypto';
import initWasm, {ext_run_keygen, ext_run_sign} from './skw_mpc_wasm';

import { defaultAccountOption, UserAccount } from '@choko-wallet/core';

import { clientNode, clientNodeRawAddr } from './fixtures';
import { extractPublicKey, MpcRequest, SerializedLocalKey, SerializedSignature } from './interface';

const runKeygenRequest = async (
  enableLog: boolean,
  existingKey?: Uint8Array
): Promise<SerializedLocalKey> => {

  await initWasm();
  const payloadId = secureGenerateRandomKey();
  const keygenRequst = MpcRequest.newKeyGenRequest(payloadId, existingKey);

  return await ext_run_keygen(
    keygenRequst.serialize(),
    clientNode[0], // peerId
    clientNodeRawAddr,
    enableLog
  );
};

const runSignRequest = async (
  message: Uint8Array,
  keygenId: Uint8Array,
  localKey: SerializedLocalKey,
  enableLog: boolean
): Promise<SerializedSignature> => {
  await initWasm();
  const payloadId = secureGenerateRandomKey();
  const signRequet = MpcRequest.newSignRequest(payloadId, message, keygenId);

  return await ext_run_sign(
    signRequet.serialize(),
    localKey,
    clientNode[0],
    clientNodeRawAddr,
    enableLog
  );
};

const mpcLocalKeyToAccount = (
  localKey: SerializedLocalKey
): UserAccount => {
  const publicKey = extractPublicKey(localKey);
  const userAccount = new UserAccount(defaultAccountOption);

  userAccount.publicKeys = [
    new Uint8Array(33),
    new Uint8Array(33),
    publicKey
  ];

  return userAccount;
};

export { runKeygenRequest, runSignRequest, mpcLocalKeyToAccount };
