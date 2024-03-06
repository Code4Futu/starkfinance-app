import { StarknetChainId, Token } from "l0k_swap-sdk";
import sample from "lodash/sample";
import { RpcProvider } from "starknet";
import { validateAndParseAddress } from "starknet";

export const APP_CHAIN_ID =
	process.env.NEXT_PUBLIC_IS_MAINNET === "true"
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
	[StarknetChainId.MAINNET]: "https://starkscan.co",
	[StarknetChainId.TESTNET]: "https://testnet.starkscan.co",
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

export const TOKEN_LIST = {
	[StarknetChainId.MAINNET]: [
		WETH[StarknetChainId.MAINNET],
		new Token(
			StarknetChainId.MAINNET,
			"0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
			6,
			"USDC",
			"USD Coin"
		),
		new Token(
			StarknetChainId.MAINNET,
			"0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
			6,
			"USDT",
			"Tether USD"
		),
		new Token(
			StarknetChainId.MAINNET,
			"0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
			18,
			"STRK",
			"Starknet Token"
		),
		new Token(
			StarknetChainId.MAINNET,
			"0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
			18,
			"WBTC",
			"Wrapped BTC"
		),
		new Token(
			StarknetChainId.MAINNET,
			"0x075ac198e734e289a6892baa8dd14b21095f13bf8401900f5349d5569c3f6e60",
			18,
			"DAI",
			"DAI"
		),
	],
	[StarknetChainId.TESTNET]: [
		WETH[StarknetChainId.TESTNET],
		new Token(
			StarknetChainId.TESTNET,
			"0x03e12863b90018323688173f044f6684f79389c626864f9f876a865d97513c1d",
			18,
			"USDC",
			"USDC"
		),
		new Token(
			StarknetChainId.TESTNET,
			"0x03f327365c803ee53491b73d82770e59643736608e077cea589685647ba2b1f8",
			18,
			"SFN",
			"StarkFinance Test"
		),
	],
};

export const TOKEN_ICON_LIST = {
	[StarknetChainId.MAINNET]: {
		[WETH[StarknetChainId.MAINNET].address]: "/tokens/eth.svg",
		[TOKEN_LIST[StarknetChainId.MAINNET][1].address]: "/tokens/usdc.png",
		[TOKEN_LIST[StarknetChainId.MAINNET][3].address]: "/tokens/strk.png",
	},
	[StarknetChainId.TESTNET]: {
		[WETH[StarknetChainId.TESTNET].address]: "/tokens/eth.svg",
		[TOKEN_LIST[StarknetChainId.TESTNET][1].address]: "/tokens/usdc.png",
		[TOKEN_LIST[StarknetChainId.TESTNET][2].address]: "/tokens/sfn.png",
	},
};

export const UNKNOWN_TOKEN_ICON = "/tokens/unknown.svg";

export const getTokenIcon = (address: string | undefined) => {
	return !!address
		? TOKEN_ICON_LIST[APP_CHAIN_ID][validateAndParseAddress(address)] ??
				UNKNOWN_TOKEN_ICON
		: UNKNOWN_TOKEN_ICON;
};

export const StarknetRpcProvider = new RpcProvider({
	nodeUrl: sample(NETWORKS_SUPPORTED[APP_CHAIN_ID].rpc)!,
});
