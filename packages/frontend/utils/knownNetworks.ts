export interface Network {
    providers: Record<string, string>;
    info: string;
    text: string;
    defaultProvider: string;
    networkType: string;
    nativeTokenSymbol: string;
    nativeTokenDecimal: number;
    homepage?: string;
    isChild?: boolean;
    isDevelopment?: boolean;
    isDisabled?: boolean;
    isUnreachable?: boolean;
    paraId?: number;
    summary?: string;
    color?: string;
    logo?: string;
}

export interface KnownNetworks {
    [key: string]: Network
}

const knownNetworks: KnownNetworks = {
    "847e7b7fa160d85f": {//skye.kiwi
        "providers": {
            "SkyeKiwi": "wss://staging.rpc.skye.kiwi"
        },
        "defaultProvider": "wss://staging.rpc.skye.kiwi",
        "networkType": "polkadot",
        "info": "skyekiwi",
        "text": "SkyeKiwi Network",
        "nativeTokenSymbol": "SKW",
        "nativeTokenDecimal": 12,
        "homepage": "https://skye.kiwi",
        "isDevelopment": true,
        "color": "#6667ab"
    },
    "e658ad422326d7f7": {//polkadot
        "providers": {
            "Parity": "wss://rpc.polkadot.io",
            "OnFinality": "wss://polkadot.api.onfinality.io/public-ws",
            "Dwellir": "wss://polkadot-rpc.dwellir.com",
            "Pinknode": "wss://public-rpc.pinknode.io/polkadot",
            "RadiumBlock": "wss://polkadot.public.curie.radiumblock.io/ws"
        },
        "defaultProvider": "wss://rpc.polkadot.io",
        "networkType": "polkadot",
        "info": "polkadot",
        "text": "Polkadot Network",
        "nativeTokenSymbol": "DOT",
        "nativeTokenDecimal": 10,
        "homepage": "https://polkadot.network",
        "color": "#e6007a"
    },
    "0018a49f151bcb20": {//kusama
        "providers": {
            "Parity": "wss://kusama-rpc.polkadot.io",
            "OnFinality": "wss://kusama.api.onfinality.io/public-ws",
            "Dwellir": "wss://kusama-rpc.dwellir.com",
            "RadiumBlock": "wss://kusama.public.curie.radiumblock.xyz/ws",
            "Pinknode": "wss://public-rpc.pinknode.io/kusama"
        },
        "defaultProvider": "wss://kusama-rpc.polkadot.io",
        "networkType": "polkadot",
        "info": "kusama",
        "text": "Kusama Network",
        "nativeTokenSymbol": "KSM",
        "nativeTokenDecimal": 12,
        "homepage": "https://polkadot.network",
        "color": "#000000"
    },
    "7950925295c6a887": {//ethmainnet
        "providers": {
            "Ethereum": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "ethereum",
        "text": "Ethereum Network",
        "nativeTokenSymbol": "ETH",
        "nativeTokenDecimal": 18,
        "homepage": "https://ethereum.org/en/",
        "color": "#627FE5"
    },


}

export default knownNetworks;