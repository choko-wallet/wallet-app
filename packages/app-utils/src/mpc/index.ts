// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */
import initWasm, {ext_run_keygen, ext_run_sign} from './skw_mpc_wasm';

import { UserAccount } from '@choko-wallet/core';
import {defaultMpcAccountOption} from '@choko-wallet/core/accountOption'

import { Certificate } from '@choko-wallet/auth-client/types';

import { extractPublicKey, MpcRequest, SerializedLocalKey, SerializedSignature } from './interface';
import { u8aToHex } from '@skyekiwi/util';
import { fetchPeers } from './fetchFixtures';

const certificateToAuthHeader = (cert: Certificate): string => {
  return JSON.stringify({
    proof: {
      payload: u8aToHex(cert.payload),
      signature: u8aToHex(cert.signature)
    }
  });
}

const clientAddr = "/dns/c.mpc.choko.app/tcp/443/wss";

const runKeygenRequest = async (
  payloadId: Uint8Array,
  usageCertificate: Certificate,
  enableLog = true,
  existingKey?: Uint8Array
): Promise<SerializedLocalKey> => {
  const fixture = await fetchPeers();

  console.log(fixture)

  await initWasm();
  // const payloadId = secureGenerateRandomKey();
  const keygenRequst = MpcRequest.newKeyGenRequest(fixture, payloadId, existingKey);
  
  console.log(keygenRequst)
  return await ext_run_keygen(
    certificateToAuthHeader(usageCertificate),
    keygenRequst.serialize(),
    fixture.c[0], // peerId
    clientAddr,
    enableLog
  );
};

const runSignRequest = async (
  payloadId: Uint8Array,
  auth: string,
  message: Uint8Array,
  keygenId: Uint8Array,
  localKey: SerializedLocalKey,
  enableLog: boolean
): Promise<SerializedSignature> => {
  const fixture = await fetchPeers();
  await initWasm();
  // const payloadId = secureGenerateRandomKey();
  const signRequet = MpcRequest.newSignRequest(fixture, payloadId, message, keygenId);

  return await ext_run_sign(
    auth,
    signRequet.serialize(),
    localKey,
    fixture.c[0], // peerId
    clientAddr,
    enableLog
  );
};

const mpcLocalKeyToAccount = (
  localKey: SerializedLocalKey,
  keygenId: Uint8Array,
): UserAccount => {
  const publicKey = extractPublicKey(localKey);
  const userAccount = new UserAccount(defaultMpcAccountOption);

  userAccount.publicKeys = [
    new Uint8Array(33),
    new Uint8Array(33),
    publicKey
  ];

  userAccount.noteMpcWallet(keygenId, localKey);
  return userAccount;
};

export { runKeygenRequest, runSignRequest, mpcLocalKeyToAccount };
