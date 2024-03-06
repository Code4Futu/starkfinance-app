import { WETH } from "@/app/configs/networks";
import { JSBI, Percent, StarknetChainId, Token } from "l0k_swap-sdk";

// export const MULTICALL_ADDRESS = {
// 	[CHAIN_ID.ZETA_TESTNET]: "0x4aF8d9Ab04EA63C621C729EFd95d6BDCB8B15cf9",
// 	[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]:
// 		"0x51Ba566222d88996658c39CBe38e17efa84b69e5",
// };

export const FACTORY_ADDRESS = {
	[StarknetChainId.MAINNET]:
		"0x64613af31ea3b32fd7608f6fde869de79304b19c80c8b759704060d5b392046",
	[StarknetChainId.TESTNET]:
		"0x13933db8e632249d1593b79b2146b7faddb17e2b6c5bd4de64702f66c9301e0",
};

export const ROUTER_ADDRESS = {
	[StarknetChainId.MAINNET]:
		"0x2a6396450ee16b429936b7331d19c0a63b54d0712bee7601c70716ee8d8eb77",
	[StarknetChainId.TESTNET]:
		"0x56470159c6c0816ebf3ddbf021e22fb48e65e5b79e0617d425b2b153acc19",
};

export const BASES_TO_CHECK_TRADES_AGAINST = {
	[StarknetChainId.MAINNET]: [WETH[StarknetChainId.MAINNET]],
	[StarknetChainId.TESTNET]: [WETH[StarknetChainId.TESTNET]],
};

export const CUSTOM_BASES: {
	[key in StarknetChainId]: { [key: string]: Token[] };
} = {
	[StarknetChainId.MAINNET]: {},
	[StarknetChainId.TESTNET]: {},
};

export enum Field {
	INPUT = "INPUT",
	OUTPUT = "OUTPUT",
}

export const MAX_TRADE_HOPS = 3;

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
	JSBI.BigInt(50),
	JSBI.BigInt(10000)
);

export const ZERO_PERCENT = new Percent("0");
export const ONE_HUNDRED_PERCENT = new Percent("1");
export const FIVE_PERCENT = new Percent(JSBI.BigInt(5), JSBI.BigInt(100));
export const SWAP_FEE_PERCENT = new Percent(JSBI.BigInt(97), JSBI.BigInt(100));

export const BIPS_BASE = JSBI.BigInt(10000);
