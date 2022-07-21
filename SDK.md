## Choko Wallet SDK Spec V0 Draft

### Types & Serde Standard

@Basics 
```js
HexString 
Version
Color 
Image
```

@Network Endpoints 
Ref: https://github.com/polkadot-js/apps/blob/master/packages/apps-config/src/endpoints/types.ts 

```js
export interface Network {
    homepage?: string;
    isChild?: boolean;
    isDevelopment?: boolean;
    isDisabled?: boolean;
    isUnreachable?: boolean;
    info?: string;
    paraId?: number;
    providers: Record<string, string>;
    summary?: string;
    text: string;
    color?: Color;
    logo?: Image;

    // maybe?
    networkTypes?: AnyJson;
}

const example = {
    info: 'skyekiwi',
    text: 'SkyeKiwi Testnet',
    providers: {
        SkyeKiwi: 'wss://staging.rpc.skye.kiwi'
    }
}

const allNetworks: Record<string, Network> = {
    'skyekiwi': {
        info: 'skyekiwi',
        text: 'SkyeKiwi Testnet',
        providers: {
            SkyeKiwi: 'wss://staging.rpc.skye.kiwi'
        }
    },

    'acala': {
        info: 'acala',
        homepage: 'https://acala.network/',
        paraId: 2000,
        text: 'Acala',
        providers: {
            'Acala Foundation 0': 'wss://acala-rpc-0.aca-api.network',
            'Acala Foundation 1': 'wss://acala-rpc-1.aca-api.network',
            'Acala Foundation 3': 'wss://acala-rpc-3.aca-api.network/ws',
            'Polkawallet 0': 'wss://acala.polkawallet.io',
            OnFinality: 'wss://acala-polkadot.api.onfinality.io/public-ws',
            Dwellir: 'wss://acala-rpc.dwellir.com'
        }
    },
}

const serialized = example['info']

const deserialized = allNetworks[serialized]
```

@Transaction 
```js
// V0
export interface Transaction {
    network: Network;
    encoded: Uint8Array;
    version: Version;
}

const tx: Transaction = {
    network: allNetworks['skyekiwi'],
    encoded: new Uint8Array([1, 2, 3]),
    version: 0x0
}

// const padToFourBytes -> 
    // convert a number 293847 to [0x00, 0xD7, 0x7B, o004] in little endian

// const parsePaddedNum -> 
    // reverse the op : [0x00, 0xD7, 0x7B, o004] to 293847

const serialized: Uint8Array ->
    padToFourBytes( encode(tx['network']).length ) +
    encode(tx['network']) + // convert to Uint8Array with TextEncoder API (by @skyekiwi/util - stringToU8a)  

    padToFourBytes( tx['encoded'].length ) +
    tx['encoded'] +

    encode(version)

const deserialized: Transaction -> 
    reverse the process 
```

@DappDescriptor

```js
export interface DappDescriptor {
    displayName: string;
    infoName: string;
    
    activeNetwork: Network;
    defaultNetwork?: Network; // or encoded network? 
    avaliableNetworks?: Network[]; // or encoded networks?

    version: Version,
}
```

@WaleltRequest
```js
export interface WalletRequestDescriptor {
    authorizationLevel: 'mandetory' | 'optional';
    
    isRemoteRequest: boolean;    
    isLocalRequest: boolean;






}

export enum WalletRequest {
    
    // remote request
    RequestAddress,

    RequestTotalTokenBalance,
    RequestTransferableTokenBalance,
    RequestLockedTokenBalance,
}
```
### Methods

connectWallet (
    dappDescriptor: DappDescriptor,
    requestPayload: WalletRequest,
) -> 