export const fetchCoinPriceByIdArray = async (idArray: [string]) => {
  const tokenIds = [];
  for (let i = 0; i < idArray.length; i++) {
    tokenIds.push(idArray[i]);
  }
  const tokenIdString = tokenIds.join('%2C');
  console.log('tokenIdString', tokenIdString)

  const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenIdString}&vs_currencies=usd`)
    .then((res) => res.json());

  console.log('data', data);

  return data;
}



export const fetchCoinPriceByAddressArray = async (addressArray: [string]) => {
  const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    .then((res) => res.json());
  return data
}