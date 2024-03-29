import { Pair, Percent, Price, Token, TokenAmount } from "l0k_swap-sdk";
import { APP_CHAIN_ID, FACTORY_ADDRESS, Field } from "../configs/networks";
import { AccountInterface, Contract, RpcProvider, cairo, num } from "starknet";
import PairAbi from "@/app/exchange/abis/starknet/Pair.json";

export interface PoolState {
	pair?: Pair | undefined;
	inputIsToken0?: boolean;
	prices: {
		[key in Field]: Price | undefined;
	};
	shareOfPool: Percent | undefined;
	totalSupply: TokenAmount | undefined;
	balanceOf?: TokenAmount | undefined;
	noLiquidity?: boolean;
}

export const EmptyPool: PoolState = {
	pair: undefined,
	inputIsToken0: true,
	prices: {
		[Field.INPUT]: undefined,
		[Field.OUTPUT]: undefined,
	},
	shareOfPool: undefined,
	totalSupply: undefined,
	noLiquidity: true,
};

export const getPoolInfo = async (
	account: string | undefined,
	library: AccountInterface | RpcProvider,
	currencies: (Token | undefined)[]
): Promise<PoolState | undefined> => {
	// if (!WETH || !FACTORY_ADDRESS) return undefined;

	console.log("123");
	const [tokenA, tokenB] = currencies;
	if (!tokenA || !tokenB || tokenA.equals(tokenB)) return undefined;

	try {
		const pairAddress = await library
			.callContract({
				contractAddress: FACTORY_ADDRESS[APP_CHAIN_ID],
				entrypoint: "get_pair",
				calldata: [tokenA.address, tokenB.address],
			})
			.then((res) => res.result[0]);

		if (!pairAddress) return EmptyPool;
		const pairContract = new Contract(PairAbi, pairAddress, library);

		const [token0, reserves, balanceOf, totalSupply] = await Promise.all([
			pairContract.token0(),
			pairContract.getReserves(),
			account ? pairContract.balanceOf(account) : undefined,
			pairContract.totalSupply(),
		]);

		const reserve0 = num.hexToDecimalString(num.toHex(reserves[0]));
		const reserve1 = num.hexToDecimalString(num.toHex(reserves[1]));

		const isTokenA0 = tokenA.address.includes(num.toHex(token0));
		const pair = new Pair(
			new TokenAmount(isTokenA0 ? tokenA : tokenB, reserve0),
			new TokenAmount(isTokenA0 ? tokenB : tokenA, reserve1)
		);
		const price01 = new Price(
			isTokenA0 ? tokenA : tokenB,
			isTokenA0 ? tokenB : tokenA,
			reserve0,
			reserve1
		);
		const price10 = new Price(
			isTokenA0 ? tokenB : tokenA,
			isTokenA0 ? tokenA : tokenB,
			reserve1,
			reserve0
		);
		const prices = {
			[Field.INPUT]: price01,
			[Field.OUTPUT]: price10,
		};

		return {
			pair,
			balanceOf: new TokenAmount(pair.liquidityToken, balanceOf),
			inputIsToken0: isTokenA0,
			prices,
			shareOfPool: new Percent(balanceOf, totalSupply),
			totalSupply: new TokenAmount(pair.liquidityToken, totalSupply),
			noLiquidity: false,
		};
	} catch (error) {
		console.log("🚀 ~ error:", error);
		return EmptyPool;
	}
};

// export const addLiquidityCallback = async (
//   account: string | null | undefined,
//   library: Web3Provider | null,
//   tokens: {
//     [Field.INPUT]: Token | undefined;
//     [Field.OUTPUT]: Token | undefined;
//   },
//   amounts: {
//     [Field.INPUT]: TokenAmount | undefined;
//     [Field.OUTPUT]: TokenAmount | undefined;
//   }
// ) => {
//   try {
//     if (
//       !account ||
//       !library ||
//       [tokens, amounts].some((e) => !e[Field.INPUT] || !e[Field.OUTPUT])
//     )
//       return;

//     const routerContract = getRouterContract(library, account);

//     let args,
//       overrides = {},
//       methodName: string = "";

//     // addLiquidityETH
//     if (
//       tokens[Field.INPUT]?.equals(WETH) ||
//       tokens[Field.OUTPUT]?.equals(WETH)
//     ) {
//       methodName = "addLiquidityETH";
//       const inputIsETH = tokens[Field.INPUT]?.equals(WETH);
//       args = [
//         (inputIsETH
//           ? tokens[Field.OUTPUT]?.address
//           : tokens[Field.INPUT]?.address) ?? "", // token
//         (inputIsETH
//           ? amounts[Field.OUTPUT]?.raw.toString()
//           : amounts[Field.INPUT]?.raw.toString()) ?? 0, // token amount
//         0, // token min
//         0, // eth min
//         account,
//         Math.floor(Date.now() / 1000) + 30 * 60, // TODO deadline of user's settings
//       ];
//       overrides = {
//         value: inputIsETH
//           ? amounts[Field.INPUT]?.raw.toString()
//           : amounts[Field.OUTPUT]?.raw.toString(),
//       };
//     } else {
//       // addLiquidity
//       methodName = "addLiquidity";
//       args = [
//         tokens[Field.INPUT]?.address ?? "", // token0
//         tokens[Field.OUTPUT]?.address ?? "", // token1
//         amounts[Field.INPUT]?.raw.toString() ?? 0, // token0 amount
//         amounts[Field.OUTPUT]?.raw.toString() ?? 0, // token1 amount
//         0, // token0 min
//         0, // token1 min
//         account,
//         Math.floor(Date.now() / 1000) + 30 * 60, // TODO deadline of user's settings
//       ];
//     }
//     return callContract(routerContract, methodName, args, overrides);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getOwnerLiquidityPools = async (
//   library: Web3Provider | undefined,
//   account: string | null | undefined
// ): Promise<(PoolState | undefined)[]> => {
//   try {
//     if (!library || !account) return [];

//     const factoryContract = getFactoryContract(library);
//     const allPairsLength = await callContract(
//       factoryContract,
//       "allPairsLength",
//       []
//     );
//     const allPairs = await Promise.all(
//       new Array(+allPairsLength.toString())
//         .fill("")
//         .map((_, i) => callContract(factoryContract, "allPairs", [i]))
//     );

//     const pairContracts = allPairs.map((pair) =>
//       getPairContract(pair, library)
//     );

//     // TODO call with multicall
//     // const methodNames = ["token0", "token1"];
//     // const results = await getMultipleContractMultipleDataMultipleMethods(
//     //   library,
//     //   pairContracts,
//     //   methodNames,
//     //   methodNames.map((_) => [])
//     // );
//     // console.log(pairContracts);
//     let ownerPairsContracts: Contract[] = [];
//     await Promise.all(
//       pairContracts.map(async (pair) => {
//         const balanceOf = await callContract(pair, "balanceOf", [account]);
//         BigNumber.from(balanceOf).gt(BigNumber.from("0")) &&
//           ownerPairsContracts.push(pair);
//       })
//     );

//     const results = await Promise.all(
//       ownerPairsContracts.map(async (pair) => {
//         const [token0, token1, reserves, totalSupply, balanceOf] =
//           await Promise.all([
//             callContract(pair, "token0", []),
//             callContract(pair, "token1", []),
//             callContract(pair, "getReserves", []),
//             callContract(pair, "totalSupply", []),
//             callContract(pair, "balanceOf", [account]),
//           ]);

//         const { reserve0, reserve1 } = reserves;
//         const [_token0, _token1] = await Promise.all(
//           [token0, token1].map(async (token) => {
//             const erc20Contract = getERC20Contract(token, library);
//             const erc20Methods = ["name", "symbol", "decimals"];
//             const results = await getSingleContractMultipleDataMultipleMethods(
//               library,
//               erc20Contract,
//               erc20Methods,
//               erc20Methods.map((_) => [])
//             );
//             if (!results?.length) return;
//             const _token = results.reduce((memo, result, i) => {
//               if (result?.[0]) memo[erc20Methods[i]] = result[0];
//               return memo;
//             }, {});
//             if (
//               Array.from(
//                 new Set([...Object.keys(_token), ...erc20Methods]).values()
//               ).length !== erc20Methods.length
//             )
//               return;

//             return new Token(
//               NETWORKS_SUPPORTED.chainId,
//               token,
//               _token["decimals"],
//               _token["symbol"],
//               _token["name"]
//             );
//           })
//         );
//         if (!_token0 || !_token1) return;

//         const _pair = new Pair(
//           new TokenAmount(_token0, reserve0),
//           new TokenAmount(_token1, reserve1)
//         );
//         const price01 = new Price(_token0, _token1, reserve0, reserve1);
//         const price10 = new Price(_token1, _token0, reserve1, reserve0);
//         const prices = {
//           [Field.INPUT]: price01,
//           [Field.OUTPUT]: price10,
//         };

//         return {
//           pair: _pair,
//           totalSupply: new TokenAmount(_pair.liquidityToken, totalSupply),
//           balanceOf: new TokenAmount(_pair.liquidityToken, balanceOf),
//           prices,
//           shareOfPool: new Percent(balanceOf, totalSupply),
//         };
//       })
//     );
//     return results;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const removeLiquidityCallback = async (
//   account: string | null | undefined,
//   library: Web3Provider | null,
//   pair: Pair,
//   removeAmount: BigNumber
// ) => {
//   try {
//     if (!account || !library || !WETH || removeAmount.lte(BigNumber.from("0")))
//       return;
//     let token0: Token, token1: Token;
//     [token0, token1] = [pair.token0, pair.token1];

//     const routerContract = getRouterContract(library, account);

//     const deadline = Math.floor(Date.now() / 1000) + 30 * 60;

//     let args,
//       overrides = {},
//       methodName: string = "";

//     // removeLiquidityETH
//     if (token0.equals(WETH) || token1.equals(WETH)) {
//       methodName = "removeLiquidityETH";
//       const token0IsETH = token0.equals(WETH);
//       args = [
//         (token0IsETH ? token1.address : token0.address) ?? "", // token
//         removeAmount.toString(), // liquidity remove
//         0, // token min
//         0, // eth min
//         account,
//         deadline, // TODO deadline of user's settings
//       ];
//     } else {
//       // removeLiquidity
//       methodName = "removeLiquidity";
//       args = [
//         token0.address ?? "", // token0
//         token1.address ?? "", // token1
//         removeAmount.toString(), // liquidity remove
//         0, // token0 min
//         0, // token1 min
//         account,
//         deadline, // TODO deadline of user's settings
//       ];
//     }
//     const _pair = computePairAddress({
//       factoryAddress: FACTORY_ADDRESS,
//       tokenA: token0,
//       tokenB: token1,
//     });
//     const pairContract = getPairContract(_pair, library, account);
//     await callContract(pairContract, "approve", [ROUTER_ADDRESS, removeAmount]);
//     return callContract(routerContract, methodName, args, overrides);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
