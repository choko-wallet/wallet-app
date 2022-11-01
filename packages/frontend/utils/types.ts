
export type CryptoForBalance = {
  name: string,
  symbol: string,
  balance: number,
  decimals?: number;
  contractAddress?: string,
  img?: string,
  priceInUSD?: number,
  balanceInUSD?: number,
};