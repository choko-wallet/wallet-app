// Copyright 2021-2022 @choko-wallet/request-handler authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { IRequestHandlerDescriptor, RequestHandler,IRequestError, IRequest, IResponse, IPayload, UserAccount } from '@choko-wallet/core';
// import type { IDappDescriptor, IUserAccount } from '@choko-wallet/core';
// import { DappDescriptor } from '@choko-wallet/core/dapp';
// import type { HexString, Version } from '@choko-wallet/core/types';

// import { CURRENT_VERSION } from '@choko-wallet/core/types';
// import { xxHash } from '@choko-wallet/core/util';
// import { hexToU8a, u8aToHex } from '@skyekiwi/util';

// export class SingMessageError implements IRequestError {
//   reason: Uint8Array;

//   constructor(config: {
//     reason: Uint8Array
//   }) {
//     this.reason = config.reason;
//   }
// }

// export class SignMessageRequestPayload implements IPayload{
//   public readonly message: Uint8Array;

//   constructor(config: {
//     message: Uint8Array,
//   }) {
//     const { message } = config;
//     this.message = message;
//   }

//   public build(): Uint8Array {
//     return this.message;
//   }

//   public static parse(data: Uint8Array): SignMessageRequestPayload {
//     return new SignMessageRequestPayload({
//       message: data,
//     })
//   }
// }

// export class SignMessageResponsePayload implements IPayload{
//   public readonly singature: Uint8Array;

//   constructor(config: {
//     singature: Uint8Array,
//   }) {
//     const { singature } = config;
//     this.singature = singature;
//   }

//   public build(): Uint8Array {
//     return this.singature;
//   }

//   public static parse(data: Uint8Array): SignMessageResponsePayload {
//     return new SignMessageResponsePayload({
//       singature: data,
//     })
//   }
// }

// class SignMessageRequest implements IRequest {

//   dappOrigin: IDappDescriptor;
//   userOrigin: IUserAccount;

//   type: HexString;

//   isRemote: boolean; // do we need to interact with blockchain?
//   payload: IPayload;

//   version: Version;

//   constructor(config: {
//     dappOrigin: IDappDescriptor,
//     payload: SignMessageRequestPayload,
//     userOrigin: IUserAccount,
//   }) {
//     const { dappOrigin, userOrigin, payload } = config;
//     this.dappOrigin = dappOrigin;
//     this.userOrigin = userOrigin;

//     this.payload = payload;
//     this.type = u8aToHex( xxHash('signMessage') );
//     this.isRemote = false;

//     this.version = CURRENT_VERSION;
//   }

//   public validatePayload(): boolean {
//     try {
//       this.payload.build();
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }

//   public serialize(): Uint8Array {
//     const length = (68 + 68 + 16 + 1) + // DappOrigin
//       (36) + // UserAccount
//       (this.payload.build().length); // Payload

//     const res = new Uint8Array(length);
//     res.set(this.dappOrigin.serialize(), 0);
//     res.set(this.userOrigin.serialize(), 68);
//     res.set(this.payload.build(), 68 + 36);
//     return res;
//   }

//   public static deserialize(data: Uint8Array): SignMessageRequest {
//     const dappOrigin = DappDescriptor.deserialize(data.slice(0, 68));
//     const userOrigin = UserAccount.deserialize(data.slice(68, 68 + 36));
//     const payload = SignMessageRequestPayload.parse(data.slice(68 + 36 + 16 + 1 + 1));
//     return new SignMessageRequest({
//       dappOrigin: dappOrigin,
//       userOrigin: userOrigin,
//       payload: payload,
//     });
//   }
// }

// class SignMessageResponse implements IResponse {

//   dappOrigin: IDappDescriptor;
//   userOrigin: IUserAccount;

//   type: HexString;

//   isSuccessful: boolean;

//   error?: IRequestError;
//   payload: IPayload;

//   version: Version;

//   constructor(config: {
//     dappOrigin: IDappDescriptor,
//     userOrigin: IUserAccount,

//     isSuccessful: boolean,

//     payload: SignMessageResponsePayload,
//     error: SingMessageError,
//   }) {
//     const { dappOrigin, userOrigin, isSuccessful, payload, error } = config;
//     this.dappOrigin = dappOrigin;
//     this.userOrigin = userOrigin;
//     this.isSuccessful = isSuccessful;
//     this.payload = payload;
//     this.type = u8aToHex( xxHash('signMessage') );
//     this.version = CURRENT_VERSION;
//     if (error) {
//       this.isSuccessful = false;
//       this.error = error;
//     }
//   }

//   public validatePayload(): boolean {
//     try {
//       this.payload.build();
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }

//   public serialize(): Uint8Array {
//     const length = (68 + 68 + 16 + 1) + // DappOrigin
//       (36) + // UserAccount
//       (1) + // isSuccessful
//       (this.payload.build().length) + // Payload
//       (this.error.reason.length); // Error

//     const res = new Uint8Array(length);
//     res.set(this.dappOrigin.serialize(), 0);
//     res.set(this.userOrigin.serialize(), 68);
//     res.set([this.isSuccessful ? 1 : 0, this.isSuccessful ? 1 : 0], 68 + 36);
//     res.set(this.payload.build(), 68 + 36 + 1);
//     res.set(this.error.reason, 68 + 36 + 1 + this.payload.build().length);

//     return res;
//   }

//   public static deserialize(data: Uint8Array): SignMessageResponse {
//     const dappOrigin = DappDescriptor.deserialize(data.slice(0, 68));
//     const userOrigin = UserAccount.deserialize(data.slice(68, 68 + 36));

//     const isSuccessful = data[68 + 36] === 1;

//     const payload = SignMessageResponsePayload.parse(data.slice(68 + 36 + 1 + 1));
//     const error = new SingMessageError({
//       reason: data.slice(68 + 36 + 1 + 1 + payload.build().length),
//     });
//     return new SignMessageResponse({
//       dappOrigin: dappOrigin,
//       userOrigin: userOrigin,

//       isSuccessful: isSuccessful,

//       payload: payload,
//       error: error,
//     });
//   }
// }

// export const SingMessageRequestHandler = (r: SignMessageRequest) => SignMessageResponse {

// }

// export class SignMessageDescriptor implements IRequestHandlerDescriptor {
//   description: string;
//   encodedRemotePayload?: Uint8Array;
//   name: string;

//   requestSchema: IRequest;
//   responseSchema: IResponse;
//   requestHandler: RequestHandler;

//   userApprovalRequired: boolean; // do we send the request to wallet approval?

//   version: Version;

// }
