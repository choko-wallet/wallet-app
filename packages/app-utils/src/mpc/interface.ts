// Copyright 2021-2022 @choko-wallet/mpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { joinSignature } from 'ethers/lib/utils';
import { MpcNodeFixtures } from './types';

export type PeerId = string;
export type Multiaddr = string;

export type NodeInfo = [PeerId, Multiaddr];

export type KeyGenRequestType = {
  keygen: null | Uint8Array,
};

export type SignRequestType = {
  message: Uint8Array,
  keygenId: Uint8Array,
  keygenPeers: NodeInfo[],
};

const serializeKeyGenRequest = (request: KeyGenRequestType): string => {
  if (request.keygen && request.keygen.length !== 32) {
    throw new Error('keygen request existing key length error');
  }

  return JSON.stringify({
    KeyGen: request.keygen ? Array.from(request.keygen) : null
  });
};

const serializeSignRequest = (request: SignRequestType): string => {
  if (request.message.length !== 32) {
    throw new Error('sign request message length error');
  }

  if (request.keygenId.length !== 32) {
    throw new Error('sign request keygenId length error');
  }

  /* eslint-disable */
  return JSON.stringify({
    SignOffline: {
      message: Array.from(request.message),
      keygen_id: Array.from(request.keygenId),
      keygen_peers: request.keygenPeers
    }
  });
  /* eslint-enable */
};

export class MpcRequest {
  payloadId: Uint8Array
  payloadType: {
    keygen: KeyGenRequestType | null,
    sign: SignRequestType | null,
  }

  peers: NodeInfo[]
  sender: PeerId

  n: number
  t: number

  constructor (
    mpcNodeFixtures: MpcNodeFixtures,
    mode: 'keygen' | 'sign',
    payloadId: Uint8Array,
    payloadType: KeyGenRequestType | SignRequestType,
    peers?: NodeInfo[],
    sender?: PeerId,
    n = 3,
    t = 2
  ) {
    this.payloadId = payloadId;

    switch (mode) {
      case 'keygen':
        this.payloadType = {
          keygen: payloadType as KeyGenRequestType,
          sign: undefined
        };
        this.peers = peers || [mpcNodeFixtures.l, mpcNodeFixtures.f1, mpcNodeFixtures.f2];
        break;
      case 'sign':
        this.payloadType = {
          keygen: undefined,
          sign: payloadType as SignRequestType
        };
        this.peers = peers || [mpcNodeFixtures.l, mpcNodeFixtures.f1];
        break;
    }



    this.sender = sender || mpcNodeFixtures.l[0];

    this.n = n;
    this.t = t;
  }

  public static newKeyGenRequest (mpcNodeFixtures: MpcNodeFixtures, payloadId: Uint8Array, existingKey?: Uint8Array): MpcRequest {
    return new MpcRequest(
      mpcNodeFixtures,
      'keygen', payloadId, { keygen: existingKey || null }
    );
  }

  public static newSignRequest (
    mpcNodeFixtures: MpcNodeFixtures,
    payloadId: Uint8Array,
    message: Uint8Array,
    keygenId: Uint8Array,
  ): MpcRequest {
    return new MpcRequest(
      mpcNodeFixtures,
      'sign', payloadId, {
        keygenId: keygenId,
        keygenPeers: [mpcNodeFixtures.l, mpcNodeFixtures.f1, mpcNodeFixtures.f2],
        message: message
      }
    );
  }

  public serialize (): string {
    let payloadTypeString = '';

    if (this.payloadType.keygen) {
      payloadTypeString = serializeKeyGenRequest(this.payloadType.keygen);
    } else if (this.payloadType.sign) {
      payloadTypeString = serializeSignRequest(this.payloadType.sign);
    } else {
      throw new Error('needs to specify a request type');
    }

    /* eslint-disable */
    return JSON.stringify({
      payload_id: Array.from(this.payloadId),
      payload_type: JSON.parse(payloadTypeString),

      peers: this.peers,
      sender: this.sender,
      n: this.n,
      t: this.t
    });
    /* eslint-enable */
  }
}

export type SerializedLocalKey = string;
export type SerializedSignature = string;

export const extractPublicKey = (localKey: SerializedLocalKey): Uint8Array => {
  /* eslint-disable */
  const obj = JSON.parse(localKey);

  if (obj.y_sum_s && obj.y_sum_s.point) {
    const publicKey = obj.y_sum_s.point;

    return hexToU8a(publicKey);
  } else {
    throw new Error('invalid local key');
  }
  /* eslint-enable */
};

export const extractSignature = (sig: SerializedSignature): Uint8Array => {
  /* eslint-disable */
  const obj = JSON.parse(sig);

  console.log(obj)
  if (obj.r && obj.r.scalar &&
    obj.s && obj.s.scalar &&
    obj.recid !== undefined) {
    const r =  hexToU8a( obj.r.scalar );
    const s = hexToU8a( obj.s.scalar );
    const recid = obj.recid;

    const sigLike = {
      r: `0x${u8aToHex(r)}`, 
      s: `0x${u8aToHex(s)}`, 
      recoveryParam: recid
    }

    return hexToU8a( joinSignature(sigLike).substring(2) );
  } else {
    throw new Error('invalid signature');
  }

  /* eslint-enable */
};
