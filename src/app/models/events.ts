import { CollectionChain } from "./collectionRanking";

export type EventStatus = "Live" | "Upcoming" | "Ended";

export enum EVENT_STATUS {
  LIVE = "Live",
  UPCOMING = "Upcoming",
  ENDED = "Ended",
}

export interface IEvent {
  chainKey: CollectionChain;

  name: string;

  owner: string;

  status: EventStatus;

  totalItem: string;

  floor: number;

  volume: number;

  logo: string;

  banner: string;

  minted: number;

  price: number;
}

export interface IEventStatusList {
  label: string;
  value: EventStatus;
}

export const eventStatusList = (): IEventStatusList[] => [
  {
    label: "Live",
    value: "Live",
  },
  {
    label: "Upcoming",
    value: "Upcoming",
  },
  {
    label: "Ended",
    value: "Ended",
  },
];
