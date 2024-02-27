import { useAccount } from "@starknet-react/core";
import { SN_RPC_PROVIDER } from "../exchange/configs/networks";

export const useActiveWeb3React = () => {
	const { address, account, isConnected } = useAccount();

	return {
		account: address,
		library: !account ? SN_RPC_PROVIDER() : account,
		isConnected,
	};
};
