export type DateFilter = "1h" | "6h" | "24h" | "7d" | "30d" | "All";

export interface Date {
  label: string;
  value: DateFilter;
}

export const dateFilters = (): Date[] => [
  {
    label: "1h",
    value: "1h",
  },
  {
    label: "6h",
    value: "6h",
  },
  {
    label: "24h",
    value: "24h",
  },
  {
    label: "7d",
    value: "7d",
  },
  {
    label: "30d",
    value: "30d",
  },
  {
    label: "All",
    value: "All",
  },
];
