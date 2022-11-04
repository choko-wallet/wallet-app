// alchemy
import { Alchemy, Network as alchemyNetwork, Utils, Wallet } from "alchemy-sdk";

export interface AlchemyAll {
  [key: string]: Alchemy
}

const alchemyAll: AlchemyAll = {
  ethMain: new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETH_MAIN,
    network: alchemyNetwork.ETH_MAINNET,
  }),
  ethGoerli: new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETH_GOERLI,
    network: alchemyNetwork.ETH_GOERLI,
  }),








}

export default alchemyAll;