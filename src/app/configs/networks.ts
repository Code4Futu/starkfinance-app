import { StarknetChainId, Token, Percent, JSBI } from "l0k_swap-sdk";
import sample from "lodash/sample";
import { RpcProvider } from "starknet";
import { validateAndParseAddress } from "starknet";

export const APP_CHAIN_ID =
	process.env.NODE_ENV === "production"
		? StarknetChainId.MAINNET
		: StarknetChainId.TESTNET;

export const NETWORKS_SUPPORTED = {
	[StarknetChainId.MAINNET]: {
		name: "Starknet Mainnet",
		rpc: ["https://starknet-mainnet.public.blastapi.io"],
	},
	[StarknetChainId.TESTNET]: {
		name: "Starknet Goerli",
		rpc: ["https://starknet-testnet.public.blastapi.io"],
	},
};

export const EXPLORER_TX = {
	// [CHAIN_ID.ZETA_TESTNET]: "https://explorer.zetachain.com/evm/tx",
	// [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]:
	// 	"https://starksport-rollup.zkevm.opside.info/tx",
};

export const WETH = {
	[StarknetChainId.MAINNET]: new Token(
		StarknetChainId.MAINNET,
		"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		18,
		"ETH",
		"Ether"
	),
	[StarknetChainId.TESTNET]: new Token(
		StarknetChainId.TESTNET,
		"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		18,
		"ETH",
		"Ether"
	),
};

// used to construct intermediary pairs for trading
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

export const TOKEN_LIST = {
	[StarknetChainId.MAINNET]: [WETH[StarknetChainId.MAINNET]],
	[StarknetChainId.TESTNET]: [
		WETH[StarknetChainId.TESTNET],
		new Token(
			StarknetChainId.TESTNET,
			"0x3e12863b90018323688173f044f6684f79389c626864f9f876a865d97513c1d",
			18,
			"USDC",
			"USDC"
		),
		new Token(
			StarknetChainId.TESTNET,
			"0x3f327365c803ee53491b73d82770e59643736608e077cea589685647ba2b1f8",
			18,
			"SFN",
			"StarkFinance Test"
		),
	],
	// [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: [
	// 	WETH[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP],
	// 	new Token(
	// 		NETWORKS_SUPPORTED[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP].chainId,
	// 		"0x87Bc2d3a2eDBbE8Df5f6929Be15A4A87879Aa5FB",
	// 		18,
	// 		"USDT",
	// 		"USDT"
	// 	),
	// ],
};

console.log(
	TOKEN_LIST[StarknetChainId.TESTNET][2].address,
	validateAndParseAddress(TOKEN_LIST[StarknetChainId.TESTNET][2].address)
);

export const TOKEN_ICON_LIST = {
	[StarknetChainId.MAINNET]: {
		[WETH[StarknetChainId.MAINNET].address]: "/tokens/eth.svg",
	},
	[StarknetChainId.TESTNET]: {
		[WETH[StarknetChainId.TESTNET].address]: "/tokens/eth.svg",
		[TOKEN_LIST[StarknetChainId.TESTNET][1].address]: "/tokens/usdc.png",
		[TOKEN_LIST[StarknetChainId.TESTNET][2].address]: "/tokens/sfn.png",
	},
};

export const UNKNOWN_TOKEN_ICON = "/tokens/unknown.svg";

// export const MULTICALL_ADDRESS = {
// 	[CHAIN_ID.ZETA_TESTNET]: "0x4aF8d9Ab04EA63C621C729EFd95d6BDCB8B15cf9",
// 	[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]:
// 		"0x51Ba566222d88996658c39CBe38e17efa84b69e5",
// };

export const FACTORY_ADDRESS = {
	[StarknetChainId.MAINNET]: "",
	[StarknetChainId.TESTNET]:
		"0x13933db8e632249d1593b79b2146b7faddb17e2b6c5bd4de64702f66c9301e0",
};

export const ROUTER_ADDRESS = {
	[StarknetChainId.MAINNET]: "",
	[StarknetChainId.TESTNET]:
		"0x56470159c6c0816ebf3ddbf021e22fb48e65e5b79e0617d425b2b153acc19",
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

export const SN_RPC_PROVIDER = () =>
	new RpcProvider({ nodeUrl: sample(NETWORKS_SUPPORTED[APP_CHAIN_ID].rpc)! });

export const getTokenIcon = (address: string | undefined) => {
	return !!address
		? TOKEN_ICON_LIST[APP_CHAIN_ID][validateAndParseAddress(address)] ??
				UNKNOWN_TOKEN_ICON
		: UNKNOWN_TOKEN_ICON;
};
