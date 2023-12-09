import { RpcProvider } from "starknet";
import LaunchpadAbi from "./abis/Launchpad.json";
import Erc20Abi from "./abis/ERC20.json";

export enum LAUNCHPAD_STATUS {
	UPCOMING = "upcoming",
	LIVE = "live",
	END = "ended",
}

export const StarknetRpcProvider = new RpcProvider({
	nodeUrl: "https://starknet-testnet.public.blastapi.io",
	// nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});

export const abis = {
	launchpad: LaunchpadAbi,
	erc20: Erc20Abi,
};
