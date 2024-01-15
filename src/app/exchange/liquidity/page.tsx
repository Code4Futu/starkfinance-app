"use client";

// @ts-ignore

import { useState, useEffect, useRef } from "react";
import { RpcProvider, Contract, uint256, number } from "starknet";
import BigNumber from "bignumber.js";
import useCurrentAccount from "../hooks/useCurrentAccount";
// import { useActiveWeb3React } from "../../evm/hooks/useActiveWeb3React";
import { erc20abi, factoryabi, pairabi } from "./abi";
import { Pagination, Skeleton } from "antd";
import { Divider } from "../components/Divider";
import { DonaInput } from "../components/StarkInput";
import { DefaultButton } from "./components/DefaultButton";
// import { useNavigate, useParams } from "react-router-dom";
import icons from "../assets/icons";
import { ArrangeIcon } from "./icons";
// import { YourLiquidity } from "../your-liquidity";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const FACTORY_ADDRESS =
	"0x594074315e98393351438011f5a558466f1733fde666f73f41738a39804c27";
// const ROUTER_ADDRESS =
//   "0x2d300192ea8d3291755bfd2bb2f9e16b38f48a20e4ce98e189d2daa7be435c2";
const provider = new RpcProvider({
	nodeUrl:
		"https://starknet-mainnet.infura.io/v3/6892505f20e24c1d86f9b3313f47ea74",
});

// randomed not truth
const tokenNameSymbol = [
	{
		name: "WBTC",
		id: "bitcoin",
		src: icons.v2.btc.src,
		price: 27623,
		toFixed: 2,
	},
	{
		name: "ETH",
		id: "ethereum",
		src: icons.v2.eth_logo.src,
		price: 1800,
		toFixed: 2,
	},
	{
		name: "BNB",
		id: "binance-coin",
		src: icons.v2.bnb_icon.src,
		price: 278,
		toFixed: 2,
	},
	{
		name: "SFN",
		id: "dogecoin",
		src: icons.v2.doge.src,
		price: 0.982,
		toFixed: 5,
	},
	{
		name: "FTM",
		id: "fantom",
		src: icons.v2.ftm.src,
		price: 0.34,
		toFixed: 5,
	},
	{
		name: "SHIB",
		id: "shiba-inu",
		src: icons.v2.shib.src,
		price: 0.0001,
		toFixed: 5,
	},
	{
		name: "USDC",
		id: "cardano",
		src: icons.v2.ada.src,
		price: 1,
		toFixed: 5,
	},
	{
		name: "XRP",
		id: "xrp",
		src: icons.v2.xrp.src,
		price: 0.35,
		toFixed: 5,
	},
];

var pairsSymbol: any[] = [];

function findTokenPriceByName(tokenName: any) {
	for (let i = 0; i < tokenNameSymbol.length; i++) {
		if (tokenNameSymbol[i].name == tokenName) {
			return tokenNameSymbol[i].price;
		}
	}
	return 1;
}

function getTokenAmountInEther(amount: any, decimals: number) {
	const tokenAmountInWei = new BigNumber(amount);
	const etherAmount = tokenAmountInWei.dividedBy(new BigNumber(10 ** decimals));
	return etherAmount.toFixed(6);
}

function hex2a(hexx: any) {
	var hex = hexx.toString(); //force conversion
	var str = "";
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str.substring(1); // remove whitespace in front
}

const TVLComponent = ({
	token0Symbol,
	token1Symbol,
	token0Reserve,
	token1Reserve,
}: any) => {
	const [token0TVL, setToken0TVL] = useState(0);
	const [token1TVL, setToken1TVL] = useState(0);
	const [TVL, setTVL] = useState(0);

	useEffect(() => {
		let token0Price = findTokenPriceByName(token0Symbol);
		let token1Price = findTokenPriceByName(token1Symbol);
		setToken0TVL(token0Price * token0Reserve);
		setToken1TVL(token1Price * token1Reserve);
	}, [token0Symbol, token1Symbol, token0Reserve, token1Reserve]);

	useEffect(() => {
		setTVL(
			Math.floor(token0TVL + token1TVL).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			}) as any
		);
	}, [token0TVL, token1TVL]);
	return <>{TVL}</>;
};

const HeaderMobile = ({ activeTab, handleActiveTab }: any) => {
	return (
		<div className="flex w-full flex-col items-start gap-3">
			<div className="flex w-full items-start gap-3">
				<DefaultButton
					title="All Pool"
					className={twMerge(
						"cursor-pointer",
						!activeTab &&
							"bg-transparent border-[1px] border-[#2D313E] text-[#f1f1f1] hover:text-[#24c3bc] btn"
					)}
					onClick={() => handleActiveTab(true)}
					textStyle=""
				/>
				<DefaultButton
					onClick={() => handleActiveTab(false)}
					title="My Pools"
					className={twMerge(
						"cursor-pointer",
						activeTab &&
							"bg-transparent border-[1px] border-[#2D313E] text-[#f1f1f1] hover:text-[#24c3bc] btn"
					)}
					textStyle=""
				/>
			</div>
		</div>
	);
};

const HeaderDesktop = ({ activeTab, handleActiveTab }: any) => {
	return (
		<div className="flex w-full flex-row justify-between gap-3">
			<div className="flex gap-3">
				<DefaultButton
					onClick={() => handleActiveTab(true)}
					title="All Pools"
					className={twMerge(
						"w-[119px] cursor-pointer",
						!activeTab &&
							"bg-transparent border-[1px] border-[#2D313E] text-[#f1f1f1] hover:text-[#24c3bc] btn"
					)}
					textStyle=""
				/>
				<DefaultButton
					onClick={() => handleActiveTab(false)}
					className={twMerge(
						"w-[121px] cursor-pointer",
						activeTab &&
							"bg-transparent border-[1px] border-[#2D313E] text-[#f1f1f1] hover:text-[#24c3bc] btn"
					)}
					title="My Pools"
					textStyle=""
				/>
			</div>
		</div>
	);
};

const Transaction = ({
	index,
	pairAddress,
	token0Address,
	token1Address,
	token0Reserve,
	token1Reserve,
	isMobile,
	loading,
}: any) => {
	const { status } = useCurrentAccount();
	// Get token symbols
	const [token0Symbol, setToken0Symbol] = useState(" - ");
	const [token1Symbol, setToken1Symbol] = useState(" - ");
	// const navigation = useNavigate();

	function useImages(sources: any) {
		const imageRefs = useRef(sources.map(() => new Image()));

		useEffect(() => {
			sources.forEach((src: any, index: number) => {
				imageRefs.current[index].src = src;
			});
		}, [sources]);

		return imageRefs;
	}

	useEffect(() => {
		const fetchData = async () => {
			if (token0Address && token1Address) {
				const token0ContractObj = new Contract(
					erc20abi,
					token0Address,
					provider
				);
				let token0_symbol = await token0ContractObj.call("symbol");

				let token0SymbolValue = hex2a(number.toHex(token0_symbol.toString()));
				setToken0Symbol(token0SymbolValue);
				const token1ContractObj = new Contract(
					erc20abi,
					token1Address,
					provider
				);
				let token1_symbol = await token1ContractObj.call("symbol");
				let token1SymbolValue = hex2a(number.toHex(token1_symbol.toString()));
				setToken1Symbol(token1SymbolValue);
				if (token0SymbolValue && token1SymbolValue && index) {
					pairsSymbol[index]["token0SymbolData"] =
						token0SymbolValue === undefined ? "" : token0SymbolValue;
					pairsSymbol[index]["token1SymbolData"] = token1SymbolValue;
				}
			}
		};
		fetchData();
	}, [token0Address, token1Address]);

	const checkIcon = (name: string) => {
		switch (name) {
			case "ETH":
				return icons.v2.eth_logo.src;
			case "WBTC":
				return icons.v2.btc.src;
			case "DAI":
				return icons.v2.dai.src;
			case "USDC":
				return icons.v2.usdc.src;
			case "USDT":
				return icons.v2.usdt.src;
			case "ADA":
				return icons.v2.ada.src;
			case "SFN":
				return icons.v2.logo_noname.src;
			default:
				return;
		}
	};

	if (isMobile) {
		return (
			<Link
				className="flex w-full flex-col gap-3 cursor-pointer hover:bg-[#2D313E]"
				href={`/liquidity/${pairAddress}`}
			>
				<div className="flex w-full flex-col items-start gap-3 self-stretch">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
							<img
								src={checkIcon(token0Symbol)}
								alt="starknet logo"
								className="h-6 w-6"
							/>
							<span className="text-sm font-bold text-[#f1f1f1]">
								{token0Symbol}
							</span>
						</div>
						<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
							<img
								src={checkIcon(token1Symbol)}
								alt="eth logo"
								className="h-6 w-6"
							/>
							<span className="text-sm font-bold text-[#f1f1f1]">
								{token1Symbol}
							</span>
						</div>
					</div>
					<div className="flex w-full items-start justify-between">
						<span className="text-sm font-normal text-[#f1f1f1] w-[100px]">
							<TVLComponent
								token0Symbol={token0Symbol}
								token1Symbol={token1Symbol}
								token0Reserve={token0Reserve}
								token1Reserve={token1Reserve}
							/>
						</span>
						<span className="text-sm font-normal text-[#f1f1f1]">--</span>
						<span className="text-sm font-normal text-[#f1f1f1]">--</span>
					</div>
				</div>
				<Divider />
			</Link>
		);
	}

	return (
		<a
			className="flex flex-col pt-3 gap-3 cursor-pointer hover:bg-[#2D313E]"
			// onClick={() => navigation(`/liquidity/${pairAddress}`)}
			href={`/liquidity/${pairAddress}`}
		>
			<div className="flex w-full items-center justify-between self-stretch">
				<div className="flex w-[250px] items-center gap-3">
					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2 w-[110px]">
						<img src={checkIcon(token0Symbol)} alt="logo" className="h-6 w-6" />
						<span className="text-sm lg:text-base font-bold text-[#f1f1f1]">
							{token0Symbol}
						</span>
					</div>
					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2 w-[110px]">
						<img src={checkIcon(token1Symbol)} alt="logo" className="h-6 w-6" />
						<span className="text-sm lg:text-base font-bold text-[#f1f1f1]">
							{token1Symbol}
						</span>
					</div>
				</div>
				<span className="w-[160px] text-sm lg:text-base font-normal text-[#f1f1f1]">
					<TVLComponent
						token0Symbol={token0Symbol}
						token1Symbol={token1Symbol}
						token0Reserve={token0Reserve}
						token1Reserve={token1Reserve}
					/>
				</span>
				<span className="w-[160px] text-sm lg:text-base font-normal text-[#f1f1f1]">
					--
				</span>
				<span className="w-[100px] text-sm lg:text-base font-normal text-[#f1f1f1]">
					--
				</span>
			</div>
			<Divider />
		</a>
	);
};

const PairComponent = ({ index, pairAddress, isMobile, loading }: any) => {
	const { address, status } = useCurrentAccount();
	// Get token addresses
	const [token0Address, setToken0Address] = useState();
	const [token1Address, setToken1Address] = useState();

	// Get reserves
	const [token0Reserve, setToken0Reserve] = useState(0);
	const [token1Reserve, setToken1Reserve] = useState(0);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const pairContract = new Contract(pairabi, pairAddress, provider);
	// 		let token0_address = await pairContract.call("token0");
	// 		let token1_address = await pairContract.call("token1");
	// 		let token0AddressValue = number.toHex(token0_address.address);
	// 		let token1AddressValue = number.toHex(token1_address.address);
	// 		setToken0Address(token0AddressValue);
	// 		setToken1Address(token1AddressValue);
	// 		if (index) {
	// 			pairsSymbol[index]["token0AddressData"] = token0AddressValue.toString();
	// 			pairsSymbol[index]["token1AddressData"] = token1AddressValue.toString();
	// 		}
	// 		const token0ContractObj = new Contract(
	// 			erc20abi,
	// 			token0AddressValue,
	// 			provider
	// 		);
	// 		let token0_decimals = await token0ContractObj.call("decimals");
	// 		console.log(token0_decimals);
	// 		let token0DecimalsValue = token0_decimals.decimals.words[0];

	// 		const token1ContractObj = new Contract(
	// 			erc20abi,
	// 			token1AddressValue,
	// 			provider
	// 		);
	// 		let token1_decimals = await token1ContractObj.call("decimals");
	// 		let token1DecimalsValue = token1_decimals.decimals.words[0];
	// 		//
	// 		let reserves = await pairContract.call("get_reserves");
	// 		setToken0Reserve(
	// 			getTokenAmountInEther(
	// 				uint256.uint256ToBN(reserves.reserve0).toString(),
	// 				token0DecimalsValue
	// 			)
	// 		);
	// 		setToken1Reserve(
	// 			getTokenAmountInEther(
	// 				uint256.uint256ToBN(reserves.reserve1).toString(),
	// 				token1DecimalsValue
	// 			)
	// 		);
	// 	};
	// 	fetchData();
	// }, []);

	return (
		<Transaction
			index={index}
			pairAddress={pairAddress}
			token0Address={token0Address}
			token1Address={token1Address}
			token0Reserve={token0Reserve}
			token1Reserve={token1Reserve}
			isMobile={isMobile}
			loading={loading}
		/>
	);
};

const TransactionDesktop = ({ allPairs, loading }: any) => {
	return (
		<div className="flex w-full flex-col">
			<div className="flex items-center justify-between self-stretch">
				<span className="w-[250px] text-sm lg:text-base font-bold text-[#f1f1f1]">
					Name
				</span>
				<div className="flex w-[160px] items-center gap-1">
					<span className="text-sm lg:text-base font-bold text-[#f1f1f1]">
						Liquidity
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[160px] items-center gap-1">
					<span className="text-sm lg:text-base font-bold text-[#f1f1f1]">
						Volume (24h)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[100px] items-center gap-1">
					<span className="text-sm lg:text-base font-bold text-[#f1f1f1]">
						Fee (24h)
					</span>
					<ArrangeIcon />
				</div>
			</div>
			<Divider className="mt-3" />
			{loading ? (
				<div className="flex flex-col gap-2 w-full">
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
				</div>
			) : allPairs.length === 0 ? (
				<>No Liquidity</>
			) : (
				allPairs.map((pool: any, index: number) => {
					return (
						<PairComponent
							loading={loading}
							key={index}
							index={index}
							pairAddress={pool}
						/>
					);
				})
			)}
		</div>
	);
};

const TransactionMobile = ({ allPairs, loading }: any) => {
	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-center justify-between self-stretch">
				<div className="flex w-[90px] items-center gap-1">
					<span className="text-sm font-bold text-[#f1f1f1]">Liquidity</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[90px] items-center gap-1">
					<span className="text-sm font-bold text-[#f1f1f1]">Volume (24h)</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-sm font-bold text-[#f1f1f1]">Fee (24h)</span>
					<ArrangeIcon />
				</div>
			</div>
			<Divider />
			<div className="flex w-full flex-col gap-3">
				{loading ? (
					<div className="flex flex-col gap-2 w-full">
						<Skeleton active avatar paragraph={{ rows: 1 }} />
						<Skeleton active avatar paragraph={{ rows: 1 }} />
						<Skeleton active avatar paragraph={{ rows: 1 }} />
						<Skeleton active avatar paragraph={{ rows: 1 }} />
					</div>
				) : allPairs.length === 0 ? (
					<>No Liquidity</>
				) : (
					allPairs.map((pool: any, index: number) => {
						return (
							<PairComponent
								loading={loading}
								key={index}
								index={index}
								pairAddress={pool}
								isMobile={true}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

const LiquidityPage = () => {
	const { address, status } = useCurrentAccount();
	// 1. get_all_pairs​ in FACTORY
	const [allPairs, setAllPairs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const factoryContract = new Contract(
				factoryabi,
				FACTORY_ADDRESS,
				provider
			);
			let all_pairs = await factoryContract.call("get_all_pairs");
			// let tempAllPairs = all_pairs.re;
			// let tempArr = [];
			// pairsSymbol = [];
			// for (let index = 0; index < tempAllPairs.length; index++) {
			// 	let pair = number.toHex(tempAllPairs[index]);
			// 	tempArr.push(pair);
			// 	const pairContract = new Contract(pairabi, pair, provider);
			// 	let token0_address = await pairContract.call("token0");
			// 	let token1_address = await pairContract.call("token1");
			// 	let token0AddressValue = number
			// 		.toHex(token0_address.address)
			// 		.toString();
			// 	let token1AddressValue = number
			// 		.toHex(token1_address.address)
			// 		.toString();
			// 	const token0ContractObj = new Contract(
			// 		erc20abi,
			// 		token0AddressValue,
			// 		provider
			// 	);
			// 	let token0_symbol = await token0ContractObj.call("symbol");
			// 	let token0SymbolValue = hex2a(number.toHex(token0_symbol.symbol));
			// 	const token1ContractObj = new Contract(
			// 		erc20abi,
			// 		token1AddressValue,
			// 		provider
			// 	);
			// 	let token1_symbol = await token1ContractObj.call("symbol");
			// 	let token1SymbolValue = hex2a(number.toHex(token1_symbol.symbol));
			// 	pairsSymbol.push({
			// 		pairAddress: pair,
			// 		token0AddressData: token0AddressValue,
			// 		token1AddressData: token1AddressValue,
			// 		token0SymbolData: token0SymbolValue,
			// 		token1SymbolData: token1SymbolValue,
			// 	});
			// }
			// setAllPairs(tempArr);
			// setTotalItems(tempArr.length);
			// setLoading(false);
		};
		fetchData();
	}, []);

	// const params = useParams();

	// useEffect(() => {
	// 	if (params.activeTab == "1") setActiveTab(false);
	// 	else setActiveTab(true);
	// }, [params]);

	const handleActiveTab = (status: any) => {
		setActiveTab(status);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const handleChange = (newCurrentPage: number, newPageSize: number) => {
		setCurrentPage(newCurrentPage);
		setPageSize(newPageSize);
	};

	return (
		<div className="flex w-full flex-col gap-6 px-6 py-9 text-white mb-[80px] md:mb-[104px] md:items-center lg:py-[72px] lg:mb-0">
			<div className="flex w-full max-w-[1088px] flex-col items-start gap-3">
				<div className="w-full md:hidden">
					<HeaderMobile
						activeTab={activeTab}
						handleActiveTab={handleActiveTab}
					/>
				</div>
				<div className="hidden w-full gap-3 md:flex">
					<HeaderDesktop
						activeTab={activeTab}
						handleActiveTab={handleActiveTab}
					/>
					<div className="hidden md:flex">
						<DonaInput
							className="!h-12 w-[303px] !rounded-2xl border-[1px] !border-[#2D313E] hover:!border-[#2D313E] !bg-[#0D0E12]"
							placeholder="Search name..."
						/>
					</div>
				</div>
				<div className="w-full md:hidden">
					<DonaInput
						className="!rounded-2xl border-[1px] !border-[#2D313E] !bg-[#0D0E12]"
						placeholder="Search name..."
					/>
				</div>
			</div>
			{activeTab ? (
				<div className="flex w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
					<span className="self-stretch text-xl font-bold text-[#f1f1f1]">
						Liquidity Pools ({allPairs.length > 0 ? allPairs.length + 1 : 0})
					</span>
					<Divider />
					{loading ? (
						<div className="flex flex-col gap-2 w-full">
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
						</div>
					) : allPairs.length === 0 ? (
						<>No liquidity</>
					) : (
						<>
							<div className="w-full md:hidden">
								<TransactionMobile
									allPairs={
										currentPage === 1
											? allPairs.slice(0, currentPage * pageSize)
											: allPairs.slice(
													(currentPage - 1) * pageSize,
													currentPage * pageSize
											  )
									}
									loading={loading}
								/>
							</div>
							<div className="hidden w-full md:flex">
								<TransactionDesktop
									allPairs={
										currentPage === 1
											? allPairs.slice(0, currentPage * pageSize)
											: allPairs.slice(
													(currentPage - 1) * pageSize,
													currentPage * pageSize
											  )
									}
									loading={loading}
								/>
							</div>
							<div className="flex w-full items-center justify-center">
								<Pagination
									current={currentPage}
									pageSize={pageSize}
									total={totalItems}
									onChange={handleChange}
								/>
							</div>
						</>
					)}
				</div>
			) : (
				<>
					{/* <YourLiquidity
						loading={loading}
						allPairs={allPairs}
						pairsSymbol={pairsSymbol}
					/> */}
				</>
			)}
		</div>
	);
};

export default function WrapLiquidityPage() {
	// const { isConnected: isConnectedEvm } = useActiveWeb3React();

	// return isConnectedEvm ? <LiquidityPage /> : <LiquidityPage />;

	return <LiquidityPage />;
}
