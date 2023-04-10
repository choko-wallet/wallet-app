// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface Ingredient {
  label: string;
}

export const allIngredients = [
  { label: 'Profile' },
  { label: 'Wallet' },
  { label: 'Defi' },
  { label: 'NFT' },
  { label: 'Curation' },
  { label: 'Podcast' },
  { label: 'Game' }
  // { label: "All" },
];

const [Profile, Wallet, DeFi, NFT, Curation, Podcast, Game] = allIngredients;

export const initialTabs = [
  Profile,
  Wallet,
  DeFi,
  NFT,
  Curation,
  Podcast,
  Game
];

export function getNextIngredient (
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients);

  return allIngredients.find((ingredient) => !existing.has(ingredient));
}

export function removeItem<T> ([...arr]: T[], item: T): T[] {
  const index = arr.indexOf(item);

  index > -1 && arr.splice(index, 1);

  return arr;
}

export function closestItem<T> (arr: T[], item: T): T {
  const index = arr.indexOf(item);

  if (index === -1) {
    return arr[0];
  } else if (index === arr.length - 1) {
    return arr[arr.length - 2];
  } else {
    return arr[index + 1];
  }
}
