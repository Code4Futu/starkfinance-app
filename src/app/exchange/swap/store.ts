import { Token } from "l0k_swap-sdk";
import { create } from "zustand";
import { Field } from "../configs/networks";
import { APP_CHAIN_ID, WETH, TOKEN_LIST } from "@/app/configs/networks";

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
