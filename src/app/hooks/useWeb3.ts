import { useAccount } from "@starknet-react/core";
import { StarknetRpcProvider } from "@/app/configs/networks";
import { AccountInterface } from "starknet";

export const useWeb3 = () => {
	const { address, account, isConnected } = useAccount();

	return {
		isConnected,
		account: address,
		library: (account ?? StarknetRpcProvider) as AccountInterface,
	};
};
