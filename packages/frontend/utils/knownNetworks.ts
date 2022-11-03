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
    "402faeece1824383": {//polygon
        "providers": {
            "Polygon": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "polygon",
        "text": "Polygon Mainnet",
        "nativeTokenSymbol": "MATIC",
        "nativeTokenDecimal": 18,
        "homepage": "https://www.polygon.com/",
        "color": "#627FE5"
    },
    "e7e96958a14e0e27": {//Optimism Mainnet
        "providers": {
            "Optimism": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "optimism",
        "text": "Optimism Mainnet",
        "nativeTokenSymbol": "OP",
        "nativeTokenDecimal": 18,
        "homepage": "https://www.optimism.io",
        "color": "#627FE5"
    },
    "aff6108f83923832": {//Arbitrum Mainnet NO NATIVE TOKEN  USE ETH
        "providers": {
            "Arbitrum": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "arbitrum",
        "text": "Arbitrum Mainnet",
        "nativeTokenSymbol": "ETH",
        "nativeTokenDecimal": 18,
        "homepage": "https://arbitrum.io/",
        "color": "#627FE5"
    },
    "5d250fa40a2a1fd9": {//Astar Mainnet
        "providers": {
            "Astar Mainnet": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "astar",
        "text": "Astar Mainnet",
        "nativeTokenSymbol": "ASTR",
        "nativeTokenDecimal": 18,
        "homepage": "https://astar.network/",
        "color": "#627FE5"
    },
    "3958e67b85a2d618": {//eth goerli
        "providers": {
            "Ethereum goerli": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "ethereum goerli",
        "text": "Ethereum Goerli Network",
        "nativeTokenSymbol": "ETH",
        "nativeTokenDecimal": 18,
        "homepage": "https://ethereum.org/en/",
        "color": "#627FE5",
        "isDevelopment": true,
    },
    "ae7a7d382f96ee7e": {//polygon goerli
        "providers": {
            "Polygon goerli": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "polygon goerli",
        "text": "Polygon Goerli Network",
        "nativeTokenSymbol": "MATIC",
        "nativeTokenDecimal": 18,
        "homepage": "https://www.polygon.com/",
        "color": "#627FE5",
        "isDevelopment": true,
    },
    "1c5fba4a0e254708": {//Optimism goerli
        "providers": {
            "Optimism Goerli": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "optimism goerli",
        "text": "Optimism Goerli Network",
        "nativeTokenSymbol": "OP",
        "nativeTokenDecimal": 18,
        "homepage": "https://www.optimism.io",
        "color": "#627FE5",
        "isDevelopment": true,
    },
    "195a725509804df6": {//Arbitrum goerli
        "providers": {
            "Arbitrum Goerli": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "arbitrum goerli",
        "text": "Arbitrum Goerli Network",
        "nativeTokenSymbol": "ETH",
        "nativeTokenDecimal": 18,
        "homepage": "https://arbitrum.io/",
        "color": "#627FE5",
        "isDevelopment": true,
    },
    "9a0e88e6554543c5": {//Astar goerli
        "providers": {
            "Astar Goerli": ""
        },
        "defaultProvider": "",
        "networkType": "ethereum",
        "info": "astar goerli",
        "text": "Astar Goerli Network",
        "nativeTokenSymbol": "ASTR",
        "nativeTokenDecimal": 18,
        "homepage": "https://astar.network/",
        "color": "#627FE5",
        "isDevelopment": true,
    },


}

export default knownNetworks;