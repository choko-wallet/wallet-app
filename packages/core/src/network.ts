// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Color, Image } from './types';

import * as Util from './util';

export interface INetwork {
  providers: Record<string, string>;
  info: string;
  text: string;

  homepage?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  isDisabled?: boolean;
  isUnreachable?: boolean;
  paraId?: number;
  summary?: string;
  color?: Color;
  logo?: Image;
}

export class Network implements INetwork {
  providers: Record<string, string>;
  info: string;
  text: string;

  homepage?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  isDisabled?: boolean;
  isUnreachable?: boolean;
  paraId?: number;
  summary?: string;
  color?: Color;
  logo?: Image;

  constructor (config: INetwork) {
    this.providers = config.providers;
    this.info = config.info;
    this.text = config.text;
    this.homepage = config.homepage;
    this.isChild = config.isChild;
    this.isDevelopment = config.isDevelopment;
    this.isDisabled = config.isDisabled;
    this.isUnreachable = config.isUnreachable;
    this.paraId = config.paraId;
    this.summary = config.summary;
    this.color = config.color;
    this.logo = config.logo;
  }

  public serialize (): Uint8Array {
    return Util.xxHash(this.info);
  }
}
