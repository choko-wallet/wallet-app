## Choko Wallet SDK Spec V0 Draft

### Types & Serde Standard

@Basics 
```js
HexString 
Version
Color 
Image
Hash
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

export interface TransactionOutcome {
    isSuccessful: boolean;

    transactionHash: Hash;

    version: Version;
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

@WalletRequests
```js
export interface WalletRequestDescriptor {
    authorizationLevel: 'mandetory' | 'optional';
    origin: DappDescriptor;

    isRemoteRequest: boolean;    

    encodedRemotePayload?: Uint8Array;
}
export interface WalletRequest {
    descriptor: WalletRequestDescriptor;
    name: string;
    id: UUID;
}

const UserInfoRequests: WalletRequest[] = [
    // get user address
    {
        descriptor: {
            authorizationLevel: 'mandetory',
            origin: {
                displayName: 'Choko Wallet',
                infoName: 'choko-wallet',
                activeNetwork: allNetworks['skyekiwi'],
            } as DappDescriptor,
            isRemoteRequest: true
        },

        name: 'getUserAccount'
    },

    // get user account balance
    // this request is local: as long as we have the user address, we can fetch the result locally
    {
        descriptor: {
            authorizationLevel: 'mandetory',
            origin: {
                displayName: 'Choko Wallet',
                infoName: 'choko-wallet',
                activeNetwork: allNetworks['skyekiwi'],
            } as DappDescriptor,
            isRemoteRequest: false
        },

        name: 'getUserAccountBalance'
    }
    
    // get user locked balance
    // this request is local: as long as we have the user address, we can fetch the result locally
    {
        descriptor: {
            authorizationLevel: 'mandetory',
            origin: {
                displayName: 'Choko Wallet',
                infoName: 'choko-wallet',
                activeNetwork: allNetworks['skyekiwi'],
            } as DappDescriptor,
            isRemoteRequest: false
        },

        name: 'getUserLockedBalance'
    },
]
```


@WalletResponses
```js

export interface WalletResponseDescriptor {   
    isUserConfirmed: boolean;
    isSuccessful: boolean;

    error?: string;
    payload?: Uint8Array;
}

export interface WalletResponses{
    descriptor: WalletResponseDescriptor;
    name: string;

    id: UUID;
}
```

@default wallet requests payload spec

```js
// Remote Request
getUserAccount:
    Request: none
    Response: encode( UserAccountBase )

sendTransaction: 
    Request: encode( Transaction )
    Response: encode( TransactionOutcome )

requestSignature: 
    Request: message: Uint8Array
    Response: encode( Signature )

requestDecryption:
    // the wallet will do an re-encryption of the message to allow 
    // the user's ephemeralReceiverPublicKey to decrypt it
    Request: encode(CipherText)
    Response: encode(CipherText)

// Local Request
getUserAccountBalance
```

@UserAccount
```js
export interface UserAccount {
    
    privateKey?: Uint8Array;
    defaultDerivationPath: const string;
    isLocked: boolean;

    lock(): void; // remove privateKey if any
    unlock(privateKey: Uint8Array): void; // set privateKey

    // mandetory fields
    address: string;
    publicKey: Uint8Array; // len == 32 for curve25519 family | len == 33 for secp256k1
    keyType: 'sr25519' | 'ed25519' | 'secp256k1';

    localKeyEncryptionStrategy: 'password-v0' | 'webauthn',

    // security fields
    hasEncryptedPrivateKeyExported: boolean; 
    // whether the user had exported the private key to email
    // set to be true when 
    //      1. the account is imported from unencrypted private key link
    //      2. the account has click the link to export private key via link to email

    version: Version,
}

export interface UserAccountInfo extends UserAccount {
     // derived fields
    balance?: AccountBalance;
    connectedDapps?: DappDescriptor[];
    // ....

    version: Version,
}

export interface LockedPrivateKey {
    encryptedPrivateKey: Uint8Array; // fixed size = 32 bytes + 24 bytes nonce + 16 bytes overhead
    keyType: 'sr25519' | 'ed25519' | 'secp256k1';

    localKeyEncryptionStrategy: 'password-v0' | 'webauthn';
    hasEncryptedPrivateKeyExported: boolean;
}

type Seed = string[] // 12 seed

```

@CipherText
```js
export interface CipherText {
    cipherText: Uint8Array;
    curve: 'x25519' | 'ed25519' | 'secp256k1' | 'sr25519';

    ephemeralReceiverPublicKey: Uint8Array; // len = 32; use x25519 only
    version: Version;
}

const serialized: Uint8Array ->
    padToFourBytes( cipherText.length ) +
    cipherText +
    encode(curve) // 0, 1, 2, 3 => 0 = x25519
    ephemeralReceiverPublicKey // always 32 bytes
```