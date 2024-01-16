import { Token } from "l0k_swap-sdk";
import { create } from "zustand";
import { APP_CHAIN_ID, TOKEN_LIST, WETH } from "../configs/networks";
import { Field } from "./types";

export const useStore = create<{
	txHash: string | undefined;
	tokens: { [key in Field]: Token | undefined };
}>((set) => ({
	txHash: undefined,
	tokens: {
		[Field.INPUT]: WETH[APP_CHAIN_ID],
		[Field.OUTPUT]: TOKEN_LIST[APP_CHAIN_ID][1],
	},
}));
