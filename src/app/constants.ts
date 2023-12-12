import { RpcProvider } from "starknet";

export const BASE_API = "http://localhost:5000";

export enum LAUNCHPAD_STATUS {
	UPCOMING = "upcoming",
	LIVE = "live",
	END = "ended",
}

export const StarknetRpcProvider = new RpcProvider({
	nodeUrl: "https://starknet-testnet.public.blastapi.io",
	// nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});
