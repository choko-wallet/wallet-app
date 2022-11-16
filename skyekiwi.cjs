"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkyeKiwiNetworkHash = exports.SkyeKiwiNetwork = void 0;
var _util = require("@skyekiwi/util");
// Copyright 2021-2022 @choko-wallet/known-networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

class SkyeKiwiNetwork {
  constructor() {
    this.providers = void 0;
    this.defaultProvider = void 0;
    this.networkType = void 0;
    this.info = void 0;
    this.text = void 0;
    this.nativeTokenSymbol = void 0;
    this.nativeTokenDecimal = void 0;
    this.ss58Prefix = void 0;
    this.homepage = void 0;
    this.isChild = void 0;
    this.isDevelopment = void 0;
    this.isDisabled = void 0;
    this.isUnreachable = void 0;
    this.paraId = void 0;
    this.summary = void 0;
    this.color = void 0;
    this.logo = void 0;
    this.info = 'skyekiwi';
    this.text = 'SkyeKiwi Network';
    this.homepage = 'https://skye.kiwi';
    this.networkType = 'polkadot';
    this.nativeTokenSymbol = 'SKW';
    this.nativeTokenDecimal = 12;
    this.ss58Prefix = 42;
    this.isDevelopment = true;
    this.providers = {
      SkyeKiwi: 'wss://staging.rpc.skye.kiwi'
    };
    this.defaultProvider = 'wss://staging.rpc.skye.kiwi';
    this.color = '#6667ab';
  }
  serialize() {
    // return Util.xxHash(this.info);
    return (0, _util.hexToU8a)(SkyeKiwiNetworkHash);
  }
}
exports.SkyeKiwiNetwork = SkyeKiwiNetwork;
const SkyeKiwiNetworkHash = '847e7b7fa160d85f'; // xxHash('skyekiwi');
exports.SkyeKiwiNetworkHash = SkyeKiwiNetworkHash;