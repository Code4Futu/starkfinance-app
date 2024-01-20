export type CollectionOrder = "volume" | "trending";

export type CollectionCategory =
  | "art"
  | "sport"
  | "gaming"
  | "membership"
  | "pfps"
  | "music"
  | "photography"
  | "all";

export type CollectionChain = "starknet";

export interface CollectionChainInterface {
  label: string;
  value: CollectionChain;
}

export interface Category {
  label: string;
  value: CollectionCategory;
}

export const collectionChainList = (): CollectionChainInterface[] => [
  {
    label: "Starknet",
    value: "starknet",
  },
];

export const collectionCategories = (): Category[] => [
  {
    label: "Art",
    value: "art",
  },
  {
    label: "Sports Collectibles",
    value: "sport",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
  {
    label: "Memberships",
    value: "membership",
  },
  {
    label: "PFPs",
    value: "pfps",
  },
  {
    label: "Music",
    value: "music",
  },
  {
    label: "Photography",
    value: "photography",
  },
];
