import { Token } from "l0k_swap-sdk";
// import { StarknetRpcProvider } from "../configs/networks";

export const useTokenBalances = async (tokens: (Token | undefined)[]) => {
	// const provider = StarknetRpcProvider();
	// console.log(tokens);
	// return Promise.all(
	// 			[tokens[Field.INPUT], tokens[Field.OUTPUT]].map(async (t) => {
	// 				if (!t) return undefined;
	// 				console;
	// 				const res = await provider.callContract({
	// 					contractAddress: t.address,
	// 					entrypoint: "balanceOf",
	// 					calldata: [address],
	// 				});
	// 				return new TokenAmount(t, num.hexToDecimalString(res.result[0]));
	// 			})
	// 		);
};
