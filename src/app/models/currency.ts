export type CurrencyType = "eth" | "usdt";

export interface CurrencyInterface {
  label: string;
  value: CurrencyType;
}

export const currencyList = (): CurrencyInterface[] => [
  {
    label: "ETH",
    value: "eth",
  },
  {
    label: "USDT",
    value: "usdt",
  },
];
