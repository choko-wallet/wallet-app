// Copyright 2021-2022 @choko-wallet/mpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { joinSignature } from 'ethers/lib/utils';

import { MpcNodeFixtures } from './types';

export type PeerId = string;
export type Multiaddr = string;

export type NodeInfo = [PeerId, Multiaddr];

export class MpcRequest {
  payloadId: Uint8Array
  mode: "KeyGen" | "Sign" | "KeyRefresh"
  messageToSign: Uint8Array

  peers: NodeInfo[]
  sender: PeerId

  n: number
  t: number

  constructor (
    mpcNodeFixtures: MpcNodeFixtures,

    mode: "KeyGen" | "Sign" | "KeyRefresh",
    payloadId: Uint8Array,
    messageToSign?: Uint8Array,

    peers?: NodeInfo[],
    sender?: PeerId,
    n = 3,
    t = 2
  ) {
    this.payloadId = payloadId;
    this.mode = mode;

    if (['KeyGen', 'KeyRefresh'].includes(this.mode)) {
      this.peers = peers || [mpcNodeFixtures.l, mpcNodeFixtures.f1, mpcNodeFixtures.f2];
    } else if (this.mode === 'Sign') {
      this.messageToSign = messageToSign;
      this.peers = peers || [mpcNodeFixtures.l, mpcNodeFixtures.f1];
    }
    
    this.sender = sender || mpcNodeFixtures.l[0];

    this.n = n;
    this.t = t;
  }

  public static newKeyGenRequest (mpcNodeFixtures: MpcNodeFixtures, payloadId: Uint8Array): MpcRequest {
    return new MpcRequest( mpcNodeFixtures, 'KeyGen', payloadId );
  }

  public static newSignRequest (
    mpcNodeFixtures: MpcNodeFixtures, payloadId: Uint8Array, message: Uint8Array,
  ): MpcRequest {
    if (message.length !== 32) {
      throw new Error("wrong message length");
    }

    return new MpcRequest(
      mpcNodeFixtures, 'Sign', payloadId, message
    );
  }

  public static newKeyRefreshRequest (mpcNodeFixtures: MpcNodeFixtures, payloadId: Uint8Array): MpcRequest {
    return new MpcRequest( mpcNodeFixtures, 'KeyRefresh', payloadId );
  }

  public serialize (): string {
    if (['KeyGen', 'KeyRefresh'].includes(this.mode)) {
      /* eslint-disable */
      return JSON.stringify({
        payload_id: u8aToHex(this.payloadId),
        payload_type: this.mode,
  
        peers: this.peers,
        sender: this.sender,
        n: this.n,
        t: this.t
      });
      /* eslint-enable */
    } else if (this.mode === "Sign") {
      /* eslint-disable */
      return JSON.stringify({
        payload_id: u8aToHex(this.payloadId),
        payload_type: {
          "SignOffline": {
            "message": u8aToHex(this.messageToSign)
          }
        },

        peers: this.peers,
        sender: this.sender,
        n: this.n,
        t: this.t
      });
      /* eslint-enable */
    } else {
      throw new Error("unknow request mode")
    }
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
