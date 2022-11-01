
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
  {
    "symbol": "LIFT",
    "name": "Uplift",
    "address": "0x513C3200F227ebB62e3B3d00B7a83779643a71CF",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/20666/thumb/logo-200x200.png?1657675050",
    "coingeckoId": "uplift",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "RAZOR",
    "name": "Razor Network",
    "address": "0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x50de6856358cc35f3a9a57eaaa34bd4cb707d2cd.png",
    "coingeckoId": "razor-network",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "FTT",
    "name": "FTX",
    "address": "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9.png",
    "coingeckoId": "ftx-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "BST",
    "name": "Blocksquare",
    "address": "0x509A38b7a1cC0dcd83Aa9d06214663D9eC7c7F4a",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x509a38b7a1cc0dcd83aa9d06214663d9ec7c7f4a.png",
    "coingeckoId": "blocksquare",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "CWEB",
    "name": "Coinweb",
    "address": "0x505B5eDa5E25a67E1c24A2BF1a527Ed9eb88Bf04",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://cloudstorage.openocean.finance/images/1641272650134_8834514311784676.png",
    "coingeckoId": "coinweb",
    "listedIn": [
      "coingecko",
      "openocean"
    ]
  },
  {
    "symbol": "STEP",
    "name": "1Step.finance",
    "address": "0x50026ad58b338Cf3eccC2b422dEB8Faa725F377F",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x50026ad58b338cf3eccc2b422deb8faa725f377f.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "NU",
    "name": "NuCypher",
    "address": "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4fe83213d56308330ec302a8bd641f1d0113a4cc.png",
    "coingeckoId": "nucypher",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "ORE",
    "name": "ORE Network",
    "address": "0x4f640F2529ee0cF119A2881485845FA8e61A782A",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4f640f2529ee0cf119a2881485845fa8e61a782a.png",
    "coingeckoId": "ptokens-ore",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "GUM",
    "name": "Gourmet Galaxy",
    "address": "0x4f5fa8f2d12e5eB780f6082Dd656C565C48E0f24",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4f5fa8f2d12e5eb780f6082dd656c565c48e0f24.png",
    "coingeckoId": "gourmetgalaxy",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "DGX",
    "name": "Digix Gold",
    "address": "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF",
    "decimals": 9,
    "chainId": 1,
    "logoURI": "https://ethapi.openocean.finance/logos/0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf.png",
    "coingeckoId": "digix-gold",
    "listedIn": [
      "coingecko",
      "openocean"
    ]
  },
  {
    "symbol": "YAE",
    "name": "Cryptonovae",
    "address": "0x4eE438be38F8682ABB089F2BFeA48851C5E71EAF",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/14693/thumb/yae.png?1640337904",
    "coingeckoId": "cryptonovae",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "MCB",
    "name": "MUX Protocol",
    "address": "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4e352cf164e64adcbad318c3a1e222e9eba4ce42.png",
    "coingeckoId": "mcdex",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "arbitrum_bridge",
      "rubic",
      "lifinance"
    ]
  },
  {
    "symbol": "LST",
    "name": "Lendroid Support",
    "address": "0x4de2573e27E648607B50e1Cfff921A33E4A34405",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4de2573e27e648607b50e1cfff921a33e4a34405.png",
    "coingeckoId": "lendroid-support-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "MONONOKE-INU",
    "name": "Mononoke Inu",
    "address": "0x4da08a1Bff50BE96bdeD5C7019227164b49C2bFc",
    "decimals": 9,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/18769/thumb/z9YDK0f.png?1633357322",
    "coingeckoId": "mononoke-inu",
    "listedIn": [
      "coingecko",
      "rubic"
    ]
  },
  {
    "symbol": "APE",
    "name": "ApeCoin",
    "address": "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4d224452801aced8b2f0aebe155379bb5d594381.png",
    "coingeckoId": "apecoin",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "ORAI",
    "name": "Oraichain",
    "address": "0x4c11249814f11b9346808179Cf06e71ac328c1b5",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4c11249814f11b9346808179cf06e71ac328c1b5.png",
    "coingeckoId": "oraichain-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "DG",
    "name": "Decentral Games",
    "address": "0x4b520c812E8430659FC9f12f6d0c39026C83588D",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4b520c812e8430659fc9f12f6d0c39026c83588d.png",
    "coingeckoId": "decentral-games",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "MIS",
    "name": "MIS",
    "address": "0x4b4D2e899658FB59b1D518b68fe836B100ee8958",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4b4d2e899658fb59b1d518b68fe836b100ee8958.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "MYC",
    "name": "Mycelium",
    "address": "0x4b13006980aCB09645131b91D259eaA111eaF5Ba",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4b13006980acb09645131b91d259eaa111eaf5ba.png",
    "coingeckoId": "mycelium",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "XFIT",
    "name": "Xfit",
    "address": "0x4aa41bC1649C9C3177eD16CaaA11482295fC7441",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/14904/thumb/xfit_logo.png?1618967174",
    "coingeckoId": "xfit",
    "listedIn": [
      "coingecko",
      "rubic"
    ]
  },
  {
    "symbol": "CYFM",
    "name": "CyberFM",
    "address": "0x4a621d9f1b19296d1C0f87637b3A8D4978e9bf82",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/5476/thumb/cyberfm.png?1547041216",
    "coingeckoId": "cyberfm",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "NAOS",
    "name": "NAOS Finance",
    "address": "0x4a615bB7166210CCe20E6642a6f8Fb5d4D044496",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x4a615bB7166210CCe20E6642a6f8Fb5d4D044496/logo.png",
    "coingeckoId": "naos-finance",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "QNT",
    "name": "Quant",
    "address": "0x4a220E6096B25EADb88358cb44068A3248254675",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4a220e6096b25eadb88358cb44068a3248254675.png",
    "coingeckoId": "quant-network",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "openocean",
      "rubic",
      "lifinance"
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
    "symbol": "OPT",
    "name": "Open Predict Token",
    "address": "0x4FE5851C9af07df9e5AD8217aFAE1ea72737Ebda",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4fe5851c9af07df9e5ad8217afae1ea72737ebda.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "WPT",
    "name": "WPT Investing Corp",
    "address": "0x4FD51Cb87ffEFDF1711112b5Bd8aB682E54988eA",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4fd51cb87ffefdf1711112b5bd8ab682e54988ea.png",
    "coingeckoId": "wpt-investing-corp",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "CELR",
    "name": "Celer Network",
    "address": "0x4F9254C83EB525f9FCf346490bbb3ed28a81C667",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3814.png",
    "coingeckoId": "celer-network",
    "listedIn": [
      "coingecko",
      "uniswap",
      "arbitrum_bridge",
      "lifinance"
    ]
  },
  {
    "symbol": "crYYCRV",
    "name": "Cream yyCRV",
    "address": "0x4EE15f44c6F0d8d1136c83EfD2e8E4AC768954c6",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4ee15f44c6f0d8d1136c83efd2e8e4ac768954c6.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "FTM",
    "name": "Fantom",
    "address": "0x4E15361FD6b4BB609Fa63C81A2be19d873717870",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png",
    "coingeckoId": "fantom",
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
    "symbol": "BOOST",
    "name": "Boost",
    "address": "0x4E0fCa55a6C3A94720ded91153A27F60E26B9AA8",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/11216.png",
    "coingeckoId": "boost",
    "listedIn": [
      "coingecko",
      "arbitrum_bridge"
    ]
  },
  {
    "symbol": "CETH",
    "name": "cETH",
    "address": "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5.png",
    "coingeckoId": "compound-ether",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "rubic",
      "lifinance"
    ]
  },
  {
    "symbol": "ATUSD",
    "name": "Aave TUSD v1",
    "address": "0x4DA9b813057D04BAef4e5800E36083717b4a0341",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4da9b813057d04baef4e5800e36083717b4a0341.png",
    "coingeckoId": "aave-tusd-v1",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "MINI",
    "name": "Mini",
    "address": "0x4D953cf077c0C95Ba090226E59A18FcF97db44EC",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://ethapi.openocean.finance/logos/0x4d953cf077c0c95ba090226e59a18fcf97db44ec.png",
    "coingeckoId": "mini",
    "listedIn": [
      "coingecko",
      "openocean"
    ]
  },
  {
    "symbol": "MYST",
    "name": "Mysterium",
    "address": "0x4Cf89ca06ad997bC732Dc876ed2A7F26a9E7f361",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361.png",
    "coingeckoId": "mysterium",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "KEY",
    "name": "SelfKey",
    "address": "0x4CC19356f2D37338b9802aa8E8fc58B0373296E7",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://ethapi.openocean.finance/logos/0x4cc19356f2d37338b9802aa8e8fc58b0373296e7.png",
    "coingeckoId": "selfkey",
    "listedIn": [
      "coingecko",
      "uniswap",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "PAINT",
    "name": "MurAll",
    "address": "0x4C6eC08CF3fc987c6C4BEB03184D335A2dFc4042",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4c6ec08cf3fc987c6c4beb03184d335a2dfc4042.png",
    "coingeckoId": "paint",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "FODL",
    "name": "Fodl Finance",
    "address": "0x4C2e59D098DF7b6cBaE0848d66DE2f8A4889b9C3",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3.png",
    "coingeckoId": "fodl-finance",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "openocean",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "FONT",
    "name": "Font",
    "address": "0x4C25Bdf026Ea05F32713F00f73Ca55857Fbf6342",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4c25bdf026ea05f32713f00f73ca55857fbf6342.png",
    "coingeckoId": "font",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "TRU",
    "name": "TrueFi",
    "address": "0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4c19596f5aaff459fa38b0f7ed92f11ae6543784.png",
    "coingeckoId": "truefi",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "EFIL",
    "name": "Ethereum Wrapped Filecoin",
    "address": "0x4B7ee45f30767F36f06F79B32BF1FCa6f726DEda",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/18231/thumb/output-onlinepngtools_%287%29.png?1631060559",
    "coingeckoId": "ethereum-wrapped-filecoin",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "JUP",
    "name": "Jupiter",
    "address": "0x4B1E80cAC91e2216EEb63e29B957eB91Ae9C2Be8",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8.png",
    "coingeckoId": "jupiter",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "lifinance"
    ]
  },
  {
    "symbol": "MAID",
    "name": "MaidCoin",
    "address": "0x4Af698B479D0098229DC715655c667Ceb6cd8433",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/icons/master/token/maid.jpg",
    "coingeckoId": "maidcoin",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "KEL",
    "name": "KelVPN",
    "address": "0x4ABB9cC67BD3da9Eb966d1159A71a0e68BD15432",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://cloudstorage.openocean.finance/images/1634699078192_22645254775198143.png",
    "coingeckoId": "kelvpn",
    "listedIn": [
      "coingecko",
      "openocean"
    ]
  },
  {
    "symbol": "WZEC",
    "name": "Wrapped Zcash",
    "address": "0x4A64515E5E1d1073e83f30cB97BEd20400b66E10",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x4A64515E5E1d1073e83f30cB97BEd20400b66E10/logo.png",
    "coingeckoId": "wrapped-zcash",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "FOAM",
    "name": "FOAM",
    "address": "0x4946Fcea7C692606e8908002e55A582af44AC121",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4946fcea7c692606e8908002e55a582af44ac121.png",
    "coingeckoId": "foam-protocol",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "LIBERTAS",
    "name": "LIBERTAS",
    "address": "0x49184E6dAe8C8ecD89d8Bdc1B950c597b8167c90",
    "decimals": 2,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x49184e6dae8c8ecd89d8bdc1b950c597b8167c90.png",
    "coingeckoId": "libertas-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "CTSI",
    "name": "Cartesi",
    "address": "0x491604c0FDF08347Dd1fa4Ee062a822A5DD06B5D",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d.png",
    "coingeckoId": "cartesi",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "optimism",
      "lifinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "XZAR",
    "name": "South African Tether",
    "address": "0x48f07301E9E29c3C38a80ae8d9ae771F224f1054",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x48f07301e9e29c3c38a80ae8d9ae771f224f1054.png",
    "coingeckoId": "south-african-tether",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "VBNT",
    "name": "Bancor Governance",
    "address": "0x48Fb253446873234F2fEBbF9BdeAA72d9d387f94",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x48fb253446873234f2febbf9bdeaa72d9d387f94.png",
    "coingeckoId": "bancor-governance-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "SWISE",
    "name": "StakeWise",
    "address": "0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png",
    "coingeckoId": "stakewise",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "KUMA",
    "name": "Kuma Inu",
    "address": "0x48C276e8d03813224bb1e55F953adB6d02FD3E02",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/15526/thumb/kuma_inu.PNG?1621128824",
    "coingeckoId": "kuma-inu",
    "listedIn": [
      "coingecko",
      "rubic"
    ]
  },
  {
    "symbol": "GOF",
    "name": "Golff",
    "address": "0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c.png",
    "coingeckoId": "golff",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "TIME",
    "name": "chrono tech",
    "address": "0x485d17A6f1B8780392d53D64751824253011A260",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x485d17a6f1b8780392d53d64751824253011a260.png",
    "coingeckoId": "chronobank",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "rubic",
      "lifinance"
    ]
  },
  {
    "symbol": "POLP",
    "name": "PolkaParty",
    "address": "0x48592de8CdED16f6Bb56c896Fe1Affc37630889C",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/17867/thumb/polp_logo.jpg?1641355239",
    "coingeckoId": "polkaparty",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "ONSTON",
    "name": "Onston",
    "address": "0x47b9F01B16E9C9cb99191DCA68c9cc5bF6403957",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/20669/thumb/onston.PNG?1637547859",
    "coingeckoId": "onston",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "SRM",
    "name": "Serum",
    "address": "0x476c5E26a75bd202a9683ffD34359C0CC15be0fF",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff.png",
    "coingeckoId": "serum",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "openocean",
      "rubic",
      "lifinance"
    ]
  },
  {
    "symbol": "UNO",
    "name": "Uno Re",
    "address": "0x474021845C4643113458ea4414bdb7fB74A01A77",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x474021845c4643113458ea4414bdb7fb74a01a77.png",
    "coingeckoId": "uno-re",
    "listedIn": [
      "coingecko",
      "1inch",
      "RouterProtocol",
      "lifinance"
    ]
  },
  {
    "symbol": "FOUR",
    "name": "4thpillar technologies",
    "address": "0x4730fB1463A6F1F44AEB45F6c5c422427f37F4D0",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0.png",
    "coingeckoId": "the-4th-pillar",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "NIL",
    "name": "Nil DAO",
    "address": "0x47252A63C723889814AeBcAC0683E615624ceC64",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x47252a63c723889814aebcac0683e615624cec64.png",
    "coingeckoId": "nil-dao",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "RMRK",
    "name": "RMRK",
    "address": "0x471Ea49dd8E60E697f4cac262b5fafCc307506e4",
    "decimals": 10,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/18656/thumb/download_%281%29_%281%29.png?1632865271",
    "coingeckoId": "rmrk",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "GMI",
    "name": "Bankless DeFi Innovation Index",
    "address": "0x47110d43175f7f2C2425E7d15792acC5817EB44f",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x47110d43175f7f2c2425e7d15792acc5817eb44f.png",
    "coingeckoId": "bankless-defi-innovation-index",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "TEMPLE",
    "name": "TempleDAO",
    "address": "0x470EBf5f030Ed85Fc1ed4C2d36B9DD02e77CF1b7",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x470EBf5f030Ed85Fc1ed4C2d36B9DD02e77CF1b7/logo.png",
    "coingeckoId": "temple",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "FLUX",
    "name": "Datamine FLUX",
    "address": "0x469eDA64aEd3A3Ad6f868c44564291aA415cB1d9",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/5876.png",
    "coingeckoId": "flux",
    "listedIn": [
      "coingecko",
      "arbitrum_bridge"
    ]
  },
  {
    "symbol": "WOO",
    "name": "WOO Network",
    "address": "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4691937a7508860f876c9c0a2a617e7d9e945d4b.png",
    "coingeckoId": "woo-network",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "arbitrum_bridge",
      "rubic",
      "lifinance",
      "xyfinance"
    ]
  },
  {
    "symbol": "COVER",
    "name": "Cover Protocol",
    "address": "0x4688a8b1F292FDaB17E9a90c8Bc379dC1DBd8713",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713.png",
    "coingeckoId": "cover-protocol",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "TEL",
    "name": "Telcoin",
    "address": "0x467Bccd9d29f223BcE8043b84E8C8B282827790F",
    "decimals": 2,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x467bccd9d29f223bce8043b84e8c8b282827790f.png",
    "coingeckoId": "telcoin",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "WXMR",
    "name": "Wrapped XMR by BTSE",
    "address": "0x465e07d6028830124BE2E4aA551fBe12805dB0f5",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/icons/master/token/wxmr.jpg",
    "coingeckoId": "wrapped-xmr-btse",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "KRL",
    "name": "KRYLL",
    "address": "0x464eBE77c293E473B48cFe96dDCf88fcF7bFDAC0",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/2807/thumb/krl.png?1547036979",
    "coingeckoId": "kryll",
    "listedIn": [
      "coingecko",
      "uniswap",
      "lifinance"
    ]
  },
  {
    "symbol": "crBAC",
    "name": "Cream Basis Cash",
    "address": "0x460ea730d204c822cE709f00A8E5959921715aDC",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x460ea730d204c822ce709f00a8e5959921715adc.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "USDS",
    "name": "SpiceUSD",
    "address": "0x45fDb1b92a649fb6A64Ef1511D3Ba5Bf60044838",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/25697/thumb/USDS.png?1653440948",
    "coingeckoId": "spiceusd",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "YFV",
    "name": "YFValue",
    "address": "0x45f24BaEef268BB6d63AEe5129015d69702BCDfa",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x45f24baeef268bb6d63aee5129015d69702bcdfa.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "STKXPRT",
    "name": "pSTAKE Staked XPRT",
    "address": "0x45e007750Cc74B1D2b4DD7072230278d9602C499",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x45e007750Cc74B1D2b4DD7072230278d9602C499/logo.png",
    "coingeckoId": "persistence-staked-xprt",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "RENBCH",
    "name": "renBCH",
    "address": "0x459086F2376525BdCebA5bDDA135e4E9d3FeF5bf",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x459086f2376525bdceba5bdda135e4e9d3fef5bf.png",
    "coingeckoId": "renbch",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "PAXG",
    "name": "PAX Gold",
    "address": "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x45804880de22913dafe09f4980848ece6ecbaf78.png",
    "coingeckoId": "pax-gold",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "openocean",
      "rubic",
      "lifinance",
      "xyfinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "OXT",
    "name": "Orchid Protocol",
    "address": "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://elk.finance/tokens/logos/ethereum/0x4575f41308EC1483f3d399aa9a2826d74Da13Deb/logo.png",
    "coingeckoId": "orchid-protocol",
    "listedIn": [
      "coingecko",
      "uniswap",
      "sushiswap",
      "lifinance",
      "elkfinance"
    ]
  },
  {
    "symbol": "CAVA",
    "name": "Cavapoo",
    "address": "0x456D8f0D25A4e787eE60c401F8B963a465148f70",
    "decimals": 9,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x456d8f0d25a4e787ee60c401f8b963a465148f70.png",
    "coingeckoId": "cavapoo",
    "listedIn": [
      "coingecko",
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "VSN",
    "name": "Vision Network",
    "address": "0x456AE45c0CE901E2e7c99c0718031cEc0A7A59Ff",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x456ae45c0ce901e2e7c99c0718031cec0a7a59ff.png",
    "coingeckoId": "vision-network",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "crUSDC",
    "name": "Cream USD Coin",
    "address": "0x44fbeBd2F576670a6C33f6Fc0B00aA8c5753b322",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x44fbebd2f576670a6c33f6fc0b00aa8c5753b322.png",
    "coingeckoId": null,
    "listedIn": [
      "1inch",
      "lifinance"
    ]
  },
  {
    "symbol": "ATTR",
    "name": "Attrace",
    "address": "0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A/logo.png",
    "coingeckoId": "attrace",
    "listedIn": [
      "coingecko",
      "sushiswap"
    ]
  },
  {
    "symbol": "RADAR",
    "name": "DappRadar",
    "address": "0x44709a920fCcF795fbC57BAA433cc3dd53C44DbE",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x44709a920fccf795fbc57baa433cc3dd53c44dbe.png",
    "coingeckoId": "dappradar",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "NBT",
    "name": "NanoByte",
    "address": "0x446F2A8A39Cc730ef378Be759A3c57f1a3fE824c",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/23698/thumb/WpcmdLW.png?1645080885",
    "coingeckoId": "nanobyte",
    "listedIn": [
      "coingecko",
      "lifinance"
    ]
  },
  {
    "symbol": "BASK",
    "name": "BasketDAO",
    "address": "0x44564d0bd94343f72E3C8a0D22308B7Fa71DB0Bb",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x44564d0bd94343f72e3c8a0d22308b7fa71db0bb.png",
    "coingeckoId": "basketdao",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "UNFI",
    "name": "Unifi Protocol DAO",
    "address": "0x441761326490cACF7aF299725B6292597EE822c2",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://cloudstorage.openocean.finance/images/1634702180726_07549521334011788.png",
    "coingeckoId": "unifi-protocol-dao",
    "listedIn": [
      "coingecko",
      "uniswap",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "STKATOM",
    "name": "pSTAKE Staked ATOM",
    "address": "0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x44017598f2af1bd733f9d87b5017b4e7c1b28dde.png",
    "coingeckoId": "pstake-staked-atom",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "lifinance"
    ]
  },
  {
    "symbol": "DODO",
    "name": "DODO",
    "address": "0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd.png",
    "coingeckoId": "dodo",
    "listedIn": [
      "coingecko",
      "1inch",
      "arbitrum_bridge",
      "lifinance"
    ]
  },
  {
    "symbol": "ZEUM",
    "name": "Colizeum",
    "address": "0x436dA116249044E8B4464F0Cf21Dd93311d88190",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/24448/small/AB0cGpnx_400x400.jpg?1647681843",
    "coingeckoId": "colizeum",
    "listedIn": [
      "coingecko",
      "lifinance",
      "xyfinance"
    ]
  },

  {
    "symbol": "APEFI",
    "name": "Ape Finance",
    "address": "0x4332f8A38f14BD3D8D1553aF27D7c7Ac6C27278D",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/25625/small/APEFI.png?1652857977",
    "coingeckoId": "ape-finance",
    "listedIn": [
      "coingecko",
      "xyfinance"
    ]
  },
  {
    "symbol": "DF",
    "name": "dForce",
    "address": "0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0.png",
    "coingeckoId": "dforce-token",
    "listedIn": [
      "coingecko",
      "1inch",
      "optimism",
      "arbitrum_bridge",
      "lifinance"
    ]
  },
  {
    "symbol": "CAP",
    "name": "Cap",
    "address": "0x43044f861ec040DB59A7e324c40507adDb673142",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x43044f861ec040db59a7e324c40507addb673142.png",
    "coingeckoId": "cap",
    "listedIn": [
      "coingecko",
      "1inch",
      "openocean",
      "arbitrum_bridge",
      "lifinance"
    ]
  },
  {
    "symbol": "SPANK",
    "name": "SpankChain",
    "address": "0x42d6622deCe394b54999Fbd73D108123806f6a18",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x42d6622dece394b54999fbd73d108123806f6a18.png",
    "coingeckoId": "spankchain",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "openocean",
      "optimism",
      "lifinance"
    ]
  },
  {
    "symbol": "BOBA",
    "name": "Boba Network",
    "address": "0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://assets.coingecko.com/coins/images/20285/thumb/BOBA.png?1636811576",
    "coingeckoId": "boba-network",
    "listedIn": [
      "coingecko",
      "uniswap",
      "lifinance"
    ]
  },
  {
    "symbol": "PICKLE",
    "name": "Pickle Finance",
    "address": "0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x429881672b9ae42b8eba0e26cd9c73711b891ca5.png",
    "coingeckoId": "pickle-finance",
    "listedIn": [
      "coingecko",
      "1inch",
      "sushiswap",
      "arbitrum_bridge",
      "lifinance"
    ]
  },
  {
    "symbol": "CNT",
    "name": "Cryption Network",
    "address": "0x429876c4a6f89FB470E92456B8313879DF98B63c",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/9747.png",
    "coingeckoId": "cryption-network",
    "listedIn": [
      "coingecko",
      "arbitrum_bridge"
    ]
  },
  {
    "symbol": "CVC",
    "name": "Civic",
    "address": "0x41e5560054824eA6B0732E656E3Ad64E20e94E45",
    "decimals": 8,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x41e5560054824ea6b0732e656e3ad64e20e94e45.png",
    "coingeckoId": "civic",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "openocean",
      "lifinance"
    ]
  },
  {
    "symbol": "INV",
    "name": "Inverse Finance",
    "address": "0x41D5D79431A913C4aE7d69a668ecdfE5fF9DFB68",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://tokens.1inch.io/0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68.png",
    "coingeckoId": "inverse-finance",
    "listedIn": [
      "coingecko",
      "1inch",
      "uniswap",
      "sushiswap",
      "lifinance"
    ]
  },




]

export default ethMainnetTokenlist;