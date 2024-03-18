import { Token } from "l0k_swap-sdk";
import { create } from "zustand";
import { Field } from "./configs/networks";
import { APP_CHAIN_ID, WETH, TOKEN_LIST } from "@/app/configs/networks";

export enum TxType {
	ALL,
	SWAP,
	ADD,
	REMOVE,
}

export enum TxFilterType {
	ALL,
	WALLET,
}

export const useExchangeStore = create<{
	// txHash: string | undefined;
	tokens: { [key in Field]: Token | undefined };
	setToken: (field: Field, token: Token) => any;
	txType: TxType;
	txFilterType: TxFilterType;
}>((set) => ({
	// txHash: undefined,
	tokens: {
		[Field.INPUT]: WETH[APP_CHAIN_ID],
		[Field.OUTPUT]: TOKEN_LIST[APP_CHAIN_ID][1],
	},
	setToken: (field: Field, token: Token) =>
		set((s) => ({ tokens: { ...s.tokens, [field]: token } })),
	txType: TxType.ALL,
	txFilterType: TxFilterType.ALL,
}));
