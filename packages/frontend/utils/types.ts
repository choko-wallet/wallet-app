export type BalanceInfo = Record<string, CryptoBalance>;
export type CryptoBalance = {
  balance: number,
  img: string,
  name: string,
  symbol: string,
  priceInUSD: number,
  balanceInUSD: number,
};