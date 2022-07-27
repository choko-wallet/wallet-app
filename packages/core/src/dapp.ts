// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Version } from './types';

import { INetwork, Network } from '.';
import { padSize, stringToU8a, u8aToString, unpadSize } from '@skyekiwi/util';

export interface IDappDescriptor {
  displayName: string;
  infoName: string;

  activeNetwork: INetwork;
  defaultNetwork?: INetwork; // or encoded network?
  avaliableNetworks?: INetwork[]; // or encoded networks?

  version: Version;

  serialize: () => Uint8Array;
}

export class DappDescriptor implements IDappDescriptor {
    displayName: string;
    infoName: string;
    activeNetwork: INetwork;
    defaultNetwork?: INetwork;
    avaliableNetworks?: INetwork[];
    version: number;

    constructor(config: {
        displayName: string;
        infoName: string;
        activeNetwork: INetwork;
        defaultNetwork?: INetwork;
        avaliableNetworks?: INetwork[];
        version: Version;
    }) {
        if (config.infoName.length > 32) {
            throw new Error('name too long - DappDescriptor.contructor');
        }

        if (config.displayName.length > 32) {
            throw new Error('name too long - DappDescriptor.contructor');
        }

        this.displayName = config.displayName;
        this.infoName = config.infoName;

        this.activeNetwork = config.activeNetwork;
        this.defaultNetwork = config.defaultNetwork;
        this.avaliableNetworks = config.avaliableNetworks;
        this.version = config.version;
    }

    public serialize(): Uint8Array {
        const name = stringToU8a(this.infoName);
        const nameContainer = new Uint8Array(68);
        nameContainer.set(padSize(name.length), 0);
        nameContainer.set(name, 4);

        const displayName = stringToU8a(this.displayName);
        const displayNameContainer = new Uint8Array(68);
        displayNameContainer.set(padSize(displayName.length), 0);
        displayNameContainer.set(displayName, 4);

        const res = new Uint8Array(68 + 68 + 16 + 1);
        res.set(nameContainer, 0);
        res.set(this.activeNetwork.serialize(), 68);
        res.set([this.version], 68 + 16);

        return res;
    }

    public static deserialize(data: Uint8Array): DappDescriptor {
        if (data.length !== 68 + 68 + 16 + 1) {
            throw new Error('invalid data length - DappDescriptor.deserialize');
        }

        const nameLength = unpadSize(data.slice(0, 4));
        const name = data.slice(4, 4 + nameLength);
        const nameStr = u8aToString(name);

        const displayNameLength = unpadSize(data.slice(68, 72));
        const displayName = data.slice(4, 4 + displayNameLength);
        const displayNameStr = u8aToString(displayName);


        const activeNetwork = data.slice(68, 68 + 16);
        const version = data.slice(68 + 16, 68 + 16 + 1)[0];

        const descriptor = new DappDescriptor({
            displayName: displayNameStr,
            infoName: nameStr,
            activeNetwork: Network.deserialize(activeNetwork),
            version,
        });

        return descriptor;
    }
}