// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HexString, Version } from './types';
import { IDappDescriptor, IUserAccount } from '.';

export declare type RequestHandler = (r: IRequest) => IResponse;
export declare type RequestHandlers = Record<HexString, IRequestHandlerDescriptor>;

export interface IRequestHandlerDescriptor {
  description: string;
  encodedRemotePayload?: Uint8Array;
  name: string;

  requestSchema: IRequest;
  responseSchema: IResponse;
  requestHandler: RequestHandler;

  userApprovalRequired: boolean; // do we send the request to wallet approval?

  version: Version;
}

export interface IRequest {
  dappOrigin: IDappDescriptor;
  userOrigin: IUserAccount;

  type: HexString;

  isRemote: boolean; // do we need to interact with blockchain?
  payload?: IPayload;

  version: Version;

  validatePayload: () => boolean;
  serialize: () => Uint8Array;
// static  deserialize: (data: Uint8Array) => IRequest;
}

export interface IResponse {
  dappOrigin: IDappDescriptor;
  userOrigin: IUserAccount;

  type: HexString;

  isSuccessful: boolean;

  error?: IRequestError;
  payload?: IPayload;

  version: Version;

  validatePayload: () => boolean;
  serialize: () => Uint8Array;
// static  deserialize: (data: Uint8Array) => IResponse;
}

export interface IPayload {
  build: () => Uint8Array;
  // static parse: (data: Uint8Array) => IPayload;
}

export interface IRequestError {
  reason: Uint8Array;
}
