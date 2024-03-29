import { RpcProvider } from "starknet";

// export const BASE_API = "http://localhost:5000";
export const BASE_API = "https://launchpad-api.starkfinance.co";

export enum LAUNCHPAD_STATUS {
	UPCOMING = "upcoming",
	INPROGRESS = "inprogress",
	END = "ended",
}

export enum LAUNCHPAD_TYPE {
	PUBLIC = "public",
	PRIVATE = "private",
}

export const StarknetRpcProvider = new RpcProvider({
	nodeUrl: "https://starknet-testnet.public.blastapi.io",
	// nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});
