// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */
import initWasm, {ext_run_keygen, ext_run_key_refreh, ext_run_sign} from './skw_mpc_wasm';

import { UserAccount } from '@choko-wallet/core';
import {defaultMpcAccountOption} from '@choko-wallet/core/accountOption'

import { Certificate } from '@choko-wallet/auth-client/types';

import { extractPublicKey, MpcRequest, SerializedLocalKey, SerializedSignature } from './interface';
import { u8aToHex } from '@skyekiwi/util';
import { fetchPeers } from './fetchFixtures';

const certificateToAuthHeader = (primary: Certificate, secondary: Certificate, additional?: Certificate): string => {
  const additionalCert = additional ? {
    payload: u8aToHex(additional.payload),
    signature: u8aToHex(additional.signature),
  } : null;

  return JSON.stringify({
    primary: {
      payload: u8aToHex(primary.payload),
      signature: u8aToHex(primary.signature)
    }, 
    secondary: {
      payload: u8aToHex(secondary.payload),
      signature: u8aToHex(secondary.signature)
    },
    additional: additionalCert,
  });
}

const clientAddr = "/dns/c.mpc.choko.app/tcp/443/wss";
// const clientAddr = "/ip4/100.104.199.31/tcp/2619/ws";

const runKeygenRequest = async (
  payloadId: Uint8Array,
  serializedAuthHeader: string,

  enableLog = true,
): Promise<SerializedLocalKey> => {
  const fixture = await fetchPeers();

  await initWasm();
  const keygenRequst = MpcRequest.newKeyGenRequest(fixture, payloadId);

  return await ext_run_keygen(
    serializedAuthHeader,
    keygenRequst.serialize(),

    fixture.c[0], // peerId
    clientAddr,
    enableLog
  );
};

const runSignRequest = async (
  payloadId: Uint8Array,
  serializedAuthHeader: string,
  localKey: string,
  message: Uint8Array,
  enableLog: boolean
): Promise<SerializedSignature> => {
  const fixture = await fetchPeers();
  await initWasm();

  const signRequet = MpcRequest.newSignRequest(fixture, payloadId, message);

  return await ext_run_sign(
    serializedAuthHeader,

    signRequet.serialize(),
    localKey,

    fixture.c[0], // peerId
    clientAddr,

    enableLog
  );
};


const runKeyRefreshRequest = async (
  payloadId: Uint8Array,
  serializedAuthHeader: string,

  enableLog = true,
): Promise<SerializedLocalKey> => {
  const fixture = await fetchPeers();

  await initWasm();
  const keyrefreshRequest = MpcRequest.newKeyRefreshRequest(fixture, payloadId);

  console.log(keyrefreshRequest.serialize())

  return await ext_run_key_refreh(
    serializedAuthHeader,
    keyrefreshRequest.serialize(),

    fixture.c[0], // peerId
    clientAddr,
    enableLog
  );
};


const mpcLocalKeyToAccount = (localKey: SerializedLocalKey): UserAccount => {
  const publicKey = extractPublicKey(localKey);
  const userAccount = new UserAccount(defaultMpcAccountOption);

  userAccount.publicKeys = [
    publicKey,
    new Uint8Array(32),
  ];

  userAccount.noteMpcWallet(localKey);
  return userAccount;
};

export { certificateToAuthHeader, runKeygenRequest, runSignRequest, runKeyRefreshRequest, mpcLocalKeyToAccount };
