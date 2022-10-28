
export interface tokenDetail {
  symbol: string;
  name: string;
  decimals: number;
  address?: string;
  logoURI?: string;
  coingeckoId?: string;
  chainId?: number;
  listedIn?: string[];
  price?: number;
  balance?: number;
}

const ethMainnetTokenlist: tokenDetail[] = [
  {
    "symbol": "USDT",
    "name": "Tether",
    "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    "coingeckoId": "tether",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "optimism",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  }, {
    "symbol": "DAI",
    "name": "Dai",
    "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    "coingeckoId": "dai",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "optimism",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "USDC",
    "name": "USD Coin",
    "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    "coingeckoId": "usd-coin",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "optimism",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "BUSD",
    "name": "Binance USD",
    "address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
    "coingeckoId": "binance-usd",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "MATIC",
    "name": "Polygon",
    "address": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    "coingeckoId": "matic-network",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "HEX",
    "name": "HEX",
    "address": "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39.png",
    "coingeckoId": "hex",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "STETH",
    "name": "Lido Staked Ether",
    "address": "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png",
    "coingeckoId": "staked-ether",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "SHIB",
    "name": "Shiba Inu",
    "address": "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
    "coingeckoId": "shiba-inu",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "UNI",
    "name": "Uniswap",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
    "coingeckoId": "uniswap",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "optimism",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "OKB",
    "name": "OKB",
    "address": "0x75231F58b43240C9718Dd58B4967c5114342a86c",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/icons/master/token/okb.jpg",
    "coingeckoId": "okb",
    "listedIn": [
      "coingecko",
      "sushiswap",
      "rubic"
    ]
  },
  {
    "symbol": "LINK",
    "name": "Chainlink",
    "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    "coingeckoId": "chainlink",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "optimism",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  },














]

export default ethMainnetTokenlist;