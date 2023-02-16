export interface Ingredient {
  label: string;
}

export const allIngredients = [
  { label: "Profile" },
  { label: "Wallet" },
  { label: "Podcast" },
  { label: "NFTs" },
  { label: "DeFi" },
  { label: "Game" },
  { label: "Curation" },
  { label: "All" }
];

const [Profile, Wallet, Podcast, NFTs, DeFi, Game, Curation, All] = allIngredients;
export const initialTabs = [Profile, Wallet, Podcast, NFTs, DeFi, Game, Curation, All];

export function getNextIngredient(
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}


export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

export function closestItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index === -1) {
    return arr[0];
  } else if (index === arr.length - 1) {
    return arr[arr.length - 2];
  } else {
    return arr[index + 1];
  }
}
