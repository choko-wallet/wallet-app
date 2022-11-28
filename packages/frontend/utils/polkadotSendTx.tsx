import type { TokenMetadataResponse } from 'alchemy-sdk';
import type { BalanceInfo, CoingeckoAPIResponse, CryptoBalance } from './types';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

import { Alchemy, Network as alchemyNetwork } from 'alchemy-sdk';

import { AccountOption, DappDescriptor, Network, UserAccount } from '@choko-wallet/core';
import { knownNetworks } from '@choko-wallet/known-networks';
import { ApiPromise, WsProvider } from '@polkadot/api';

import { compressParameters, xxHash } from '@choko-wallet/core/util';
import { ethers } from 'ethers';
import { encodeContractCall } from '@choko-wallet/abi';
import { SignTxDescriptor, SignTxRequest, SignTxRequestPayload, SignTxResponse } from '@choko-wallet/request-handler';
import { Keyring } from '@polkadot/api';




export const getEncodedTx = async (network: Network, amount: number, addressToSend: string, cryptoBalance: CryptoBalance): Promise<Uint8Array> => {

  console.log('cryptoBalance', cryptoBalance)// decimal
  console.log('network', network)

  const provider = new WsProvider(network.defaultProvider);// wss

  const api = await ApiPromise.create({ provider: provider });
  const tx = api.tx.balances.transfer(
    addressToSend,// 接收地址 
    (amount * Math.pow(10, network.nativeTokenDecimal)),// 
    // (amount * Math.pow(10, 12)),
  );

  // console.log("raw tx: ", tx);
  return hexToU8a(tx.toHex().substring(2));
};


export const polkadotEncodeTxToUrl = async (network: Network, cryptoBalance: CryptoBalance, amount: number, addressToSend: string, currentUserAccount: UserAccount): Promise<string> => {

  // console.log('cryptoBalance', cryptoBalance)
  const dapp = new DappDescriptor({
    activeNetwork: knownNetworks[u8aToHex(xxHash(network.info))],
    displayName: 'Send Token Test',
    infoName: cryptoBalance.symbol,//传递币名
    version: 0,
  });

  const encoded = await getEncodedTx(network, amount, addressToSend, cryptoBalance,);//需要  地址 金额 wss

  const request = new SignTxRequest({
    dappOrigin: dapp,
    payload: new SignTxRequestPayload({ encoded }),
    userOrigin: currentUserAccount
  });

  const serialized = request.serialize();

  // const deserialized = SignTxRequest.deserialize(serialized);

  const hexRequest = u8aToHex(compressParameters(serialized))

  console.log('3', hexRequest);

  const redirectUrl = `http://localhost:3000/request/sign-tx?requestType=signTx&payload=${hexRequest}&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome`

  return redirectUrl

};
