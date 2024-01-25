export type ProfileFilter =
  | "collected"
  | "listing"
  | "offersMade"
  | "offersReceived"
  | "activity";

export type SelectFilter = "newest" | "oldest" | "highToLow" | "lowToHigh";

export type ProfileDetailFilter =
  | "information"
  | "priceHistory"
  | "offers"
  | "activity";

export interface IUserTrait {
  label: string;
  name: string;
  rate: number;
}
export interface IProfileFilter {
  label: string;
  value: ProfileFilter;
}
export interface ISelectFilter {
  label: string;
  value: SelectFilter;
}
export interface IProfileDetailFilter {
  label: string;
  value: ProfileDetailFilter;
}

export const userTraitMockup = (): IUserTrait[] => [
  {
    label: "Trait 01",
    name: "Trait Name",
    rate: 0,
  },
  {
    label: "Trait 02",
    name: "Trait Name",
    rate: 0,
  },
  {
    label: "Trait 03",
    name: "Trait Name",
    rate: 0,
  },
  {
    label: "Trait 04",
    name: "Trait Name",
    rate: 0,
  },
  {
    label: "Trait 05",
    name: "Trait Name",
    rate: 0,
  },
];

export const selectFilterMockup = (): ISelectFilter[] => [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Price high - low",
    value: "highToLow",
  },
  {
    label: "Price low - high",
    value: "lowToHigh",
  },
];

export const profileFilterMockup = (): IProfileFilter[] => [
  {
    label: "Collected",
    value: "collected",
  },
  {
    label: "Listing",
    value: "listing",
  },
  {
    label: "Offers Made",
    value: "offersMade",
  },
  {
    label: "Offers Received",
    value: "offersReceived",
  },
  {
    label: "Activity",
    value: "activity",
  },
];

export const profileDetailFilterMockup = (): IProfileDetailFilter[] => [
  {
    label: "Information",
    value: "information",
  },
  {
    label: "Price history",
    value: "priceHistory",
  },
  {
    label: "Offers",
    value: "offers",
  },
  {
    label: "Activity",
    value: "activity",
  },
];
