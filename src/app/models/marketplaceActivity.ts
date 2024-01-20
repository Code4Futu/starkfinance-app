export enum ACTIVITY_STATUS {
  SALE = "Sale",
  LISTING = "Listing",
  OFFER = "Offer",
  TRANSFER = "Transfer",
  AUCTION = "Auction",
  BID = "Bid",
}

export type ActivityEvent =
  | "All"
  | "Sale"
  | "Listing"
  | "Offer"
  | "Transfer"
  | "Auction"
  | "Bid";

interface Event {
  label: string;
  value: ActivityEvent;
}

export const eventTypeList = (): Event[] => [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Sale",
    value: "Sale",
  },
  {
    label: "Listing",
    value: "Listing",
  },
  {
    label: "Offer",
    value: "Offer",
  },
  {
    label: "Transfers",
    value: "Transfer",
  },
  {
    label: "Auction",
    value: "Auction",
  },
  {
    label: "Bid",
    value: "Bid",
  },
];

export type CollectionActivity = "VN1" | "VN2" | "VN3";

export interface CollectionFilter {
  label: string;
  total: number;
  value: CollectionActivity;
}

export const collectionFilterList = (): CollectionFilter[] => [
  {
    label: "Vietnam1 Cypher Collections",
    total: 10000,
    value: "VN1",
  },
  {
    label: "Vietnam2 Cypher Collections",
    total: 10000,
    value: "VN2",
  },
  {
    label: "Vietnam3 Cypher Collections",
    total: 10000,
    value: "VN3",
  },
];
