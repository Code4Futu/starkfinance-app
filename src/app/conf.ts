import { InjectedConnector } from "@starknet-react/core";
import { TypedData, shortString } from "starknet";

export const connectors = [
	new InjectedConnector({ options: { id: "braavos" } }),
	new InjectedConnector({ options: { id: "argentX" } }),
];

export const typedData: TypedData = {
	types: {
		StarkNetDomain: [
			{ name: "name", type: "string" },
			{ name: "version", type: "felt" },
			{ name: "chainId", type: "felt" },
		],
		Message: [
			{
				name: "message",
				type: "felt",
			},
		],
	},
	primaryType: "Message",
	domain: {
		name: "StarkFinance", // put the name of your dapp to ensure that the signatures will not be used by other DAPP
		version: "0.0.1",
		chainId: shortString.encodeShortString("SN_MAIN"), // shortString of 'SN_GOERLI' (or 'SN_MAIN' or 'SN_GOERLI2'), to be sure that signature can't be used by other network.
	},
	message: {
		message: "verify wallet address",
	},
};
