export type ProfileFilter =
  | "collected"
  | "listing"
  | "offersMade"
  | "offersReceived"
  | "activity";

export type SelectFilter = "newest" | "oldest" | "highToLow" | "lowToHigh";

export interface IProfileFilter {
  label: string;
  value: ProfileFilter;
}

export interface ISelectFilter {
  label: string;
  value: SelectFilter;
}

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
