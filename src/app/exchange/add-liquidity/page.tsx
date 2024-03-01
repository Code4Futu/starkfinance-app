"use client";

// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
	ArrowDown,
	ChartIcon,
	SettingIcon,
	SwapIcon,
} from "./components/icons";
import { Divider } from "../components/Divider";
import { SwitchButton } from "./components/SwitchButton";
import Input from "antd/es/input/Input";
import icons from "../assets/icons";
import ChartModal from "../components/modals/chart-modal/ModalChart";
import SettingChartModal from "../components/modals/settings-modal/SettingModalChart";
import SelectTokenModal from "../components/modals/select-token-modal/SelectTokenModal";
import { SwapButton } from "../components/buttons";
import { Transaction } from "./components/Transaction";
import { Pagination, Skeleton } from "antd";
import { ChartDesktop } from "./components/Chart";
import { TransactionDesktop } from "./components/TransactionDesktop";
// import { SwapPageEVM } from "../evm/pages/swap/SwapPageEVM.jsx";
import BigInt from "big-integer";
import BigNumber from "bignumber.js";
// import { BigNumber as BigNumberEthers } from "ethers";
import { Contract, RpcProvider, uint256 } from "starknet";
import factoryAbi from "../assets/abi/factory";
import pairAbi from "../assets/abi/pair";
import router from "../assets/abi/router.js";
import useCurrentAccount from "../hooks/useCurrentAccount";
// import { useActiveWeb3React } from "../evm/hooks/useActiveWeb3React.js";
import { sortsTokenBefore } from "../utils/dex.js";
import { erc20abi } from "./erc20abi.js";
import DetailBridgeModal from "../components/modals/detail-bridge/DetailBridgeModal.jsx";
import { twMerge } from "tailwind-merge";
import { useLocationPath } from "../hooks/useLocationPath.js";
import AddLiquidityForm from "./components/AddLiquidityForm";

const mockDataTokenTest = [
	{
		name: "WBTC",
		icon: icons.v2.btc,
		address:
			"0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
		decimals: 8,
		freeToken: 1,
	},
	{
		name: "ETH",
		icon: icons.v2.eth_logo,
		address:
			"0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		decimals: 18,
		freeToken: 10000,
	},
	{
		name: "USDC",
		icon: icons.v2.usdc,
		address:
			"0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
		decimals: 6,
		freeToken: 5000,
	},
	{
		name: "USDT",
		icon: icons.v2.tether_logo,
		address:
			"0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
		decimals: 6,
		freeToken: 10000,
	},
	{
		name: "DAI",
		icon: icons.v2.dai,
		address: "0xda114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
		decimals: 18,
		freeToken: 10000,
	},
	{
		name: "SFN",
		icon: icons.v2.logo_noname,
		address: "0x482c9ba8eac039eba45c875eeac660eb91768ca4a32cf3c5ae804cc62dccd2",
		decimals: 18,
		freeToken: 10000,
	},
];

// @ts-expect-error
function getTokenAmountInWei(amount, decimals) {
	const base = new BigNumber(10).exponentiatedBy(decimals);
	const tokenAmountInWei = new BigNumber(amount).multipliedBy(base);
	const tokenAmountInWeiString = BigInt(tokenAmountInWei.toString()).toString();
	return tokenAmountInWeiString;
}

// @ts-expect-error
function getTokenAmountInEther(amount, decimals) {
	const tokenAmountInWei = new BigNumber(amount);
	const etherAmount = tokenAmountInWei.dividedBy(new BigNumber(10 ** decimals));
	return etherAmount.toFixed(6);
}

function getDeadlineTime() {
	const unixTimeSeconds = Math.floor(new Date().getTime() / 1000); // current Unix time in seconds
	const fiveMinutesInSeconds = 20 * 60; // convert 20 minutes to seconds
	const newUnixTimeSeconds = unixTimeSeconds + fiveMinutesInSeconds; // add 20 minutes to the current Unix time
	return newUnixTimeSeconds;
}

const FormSwap = ({
	historicalPrices,
	setHistoricalPrices,
	setVol,
	token0,
	token1,
	setToken0,
	setToken1,
	token0InputAmount,
	setToken0InputAmount,
	token1OutputAmount,
	setToken1OutputAmount,
	token1OutputDisplayAmount,
	setToken1OutputDisplayAmount,
	handleChangeToken,
	setIsModalChartOpen,
}: any) => {
	const { account, address, status } = useCurrentAccount();
	const [isShowSetting, setIsShowSetting] = useState(false);
	const [isShowTokenModal, setIsShowTokenModal] = useState(false);
	// const [percent, setPercent] = useState(100);
	// const navigate = useNavigate();

	const inputToken0Ref = useRef(null);

	// Token Picker
	// const [token0, setToken0] = useState(mockDataTokenTest[1]);
	// const [token1, setToken1] = useState(mockDataTokenTest[2]);
	const [typeModal, setTypeModal] = useState(1);
	// Token 0 Input Amount
	const initialRender = useRef(true);

	const handleToken0InputAmountChange = (event: any) => {
		if (event.target.value === "") {
			setToken0InputAmount(0);
			setToken1OutputAmount(0);
			setToken1OutputDisplayAmount(0);
		} else {
			setToken0InputAmount(
				getTokenAmountInWei(event.target.value, token0.decimals)
			);
		}
	};

	// Token 0 Balance
	const [token0BalanceAmount, setToken0BalanceAmount] = useState(0);

	// Token 1 Balance
	const [token1BalanceAmount, setToken1BalanceAmount] = useState(0);

	const [priceImpact, setPriceImpact] = useState();

	const [submitting, setSubmitting] = useState(false);

	const getHistoricalPrices = async () => {
		try {
			const response = await axios.get(
				`https://api.starksport.finance/api/historical-prices?tokenInAddress=${token0.address}&tokenOutAddress=${token1.address}` // Fix to server query
			);
			setHistoricalPrices(response.data);
		} catch (error) {
			console.error("Error fetching historical prices:", error);
		}
	};

	// Reset token 0 input amount when change another token
	useEffect(() => {
		setToken0InputAmount(0);
		setToken1OutputAmount(0);
		setToken1OutputDisplayAmount(0);
		setPriceImpact(undefined);
		// inputToken0Ref.current.value = "";
		if (token0.address && token1.address) {
			getHistoricalPrices();
		}
	}, [token0, token1]);

	useEffect(() => {
		// async function getPairId(token0Address, token1Address) {
		// 	let res = await axios.get(
		// 		`https://api.starksport.finance/api/token-pairs/${token0Address}/${token1Address}`
		// 	);
		// 	// setRowsData(res.data);
		// 	// console.log("🚀 ~ file: index.js:560 ~ getPairId ~ res:", res.data)
		// 	let vol = parseFloat(res.data).toLocaleString(undefined, {
		// 		minimumFractionDigits: 2,
		// 		maximumFractionDigits: 2,
		// 	});
		// 	// console.log('🚀 ~ file: index.js:571 ~ getPairId ~ vol:', vol);
		// 	setVol(vol);
		// }
		// getPairId(token0.address, token1.address);
	}, [token0, token1]);

	return <AddLiquidityForm />;
};

const AddLiquidityPage = () => {
	const { account, address, status } = useCurrentAccount();
	const [vol, setVol] = useState(0);
	const [historicalPrices, setHistoricalPrices] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [filterTx, setFilterTx] = useState("All");
	const [filterTypeTx, setFilterTypeTx] = useState("All");

	// Token Picker
	const [token0, setToken0] = useState(mockDataTokenTest[1]);
	const [token1, setToken1] = useState(mockDataTokenTest[2]);

	// const { isModalOpen, toggleModalChart } = useModalChart();
	const [isModalChartOpen, setIsModalChartOpen] = useState(false);
	const [isShowBridgeModal, setIsShowBridgeModal] = useState(false);

	const currentPath = useLocationPath();

	function formatTimestamp(timestamp: number) {
		const date = new Date();
		const options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: "Africa/Abidjan",
		};

		const formattedDate = new Intl.DateTimeFormat(
			"en-US",
			options as any
		).format(date);
		return formattedDate;
	}

	function formatPrice2(price: number | string) {
		const formattedPrice = Number(price).toFixed(6);
		return formattedPrice;
	}

	const [priceSrt, setPriceSrt] = useState<string | undefined>();
	const [dateCurrent, setDateCurrent] = useState<string | undefined>();
	// const [activeIndex, setActiveIndex] = useState(0);
	const [rowsData, setRowsData] = useState([]); // TODO
	const [walletData, setWalletData] = useState([]);

	useEffect(() => {
		if (historicalPrices && historicalPrices.length > 0) {
			setPriceSrt(
				formatPrice2(historicalPrices[historicalPrices.length - 1]?.price)
			);
			setDateCurrent(
				formatTimestamp(
					historicalPrices[historicalPrices.length - 1]?.timestamp as any
				)
			);

			// You can use the formatTimestamp() function here, assuming it's defined in your code
			// if (firstTimestamp) {
			//     setDateCurrent(formatTimestamp(firstTimestamp));
			// }
		}
		// setPriceSrt(formatPrice(historicalPrices[0].price));
		// setDateCurrent(formatTimestamp(historicalPrices[0].timestamp));
	}, [historicalPrices]);

	useEffect(() => {
		async function getSwapTx() {
			try {
				let res = await axios.get(
					`https://api.starksport.finance/api/swap-transactions/latest`
				);
				setRowsData(res.data);
				setLoading(false);
				setTotalItems(res.data.length);
			} catch (error) {}
		}
		getSwapTx();
	}, []);

	useEffect(() => {
		if (filterTx === "All") return;
		if (filterTx === "Wallet") {
			let tempArr: any[] = [];
			rowsData.map((item: any, idx) => {
				if (item.sender_address === address) {
					tempArr.push(item);
				}
			});
			setWalletData(tempArr as any);
		}
	}, [filterTx]);

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const handleChange = (newCurrentPage: number, newPageSize: number) => {
		setCurrentPage(newCurrentPage);
		setPageSize(newPageSize);
	};

	const [token0InputAmount, setToken0InputAmount] = useState(0);
	const [token1OutputAmount, setToken1OutputAmount] = useState(0);
	const [token1OutputDisplayAmount, setToken1OutputDisplayAmount] = useState(0);

	const handleChangeToken = async () => {
		const tempToken = token0;
		setToken0(token1);
		setToken1(tempToken);
		setToken0InputAmount(0);
		setToken1OutputAmount(0);
		setToken1OutputDisplayAmount(0);
	};

	return (
		<div
			className={twMerge(
				"flex w-full flex-col gap-6text-white mb-[80px] max-[480px]:items-center md:items-center",
				currentPath === "/bridge" && "lg:pt-[222px]"
			)}
		>
			<div
				className={twMerge(
					"flex flex-row justify-center items-center gap-6 xl:max-h-[514px] xl:flex-col xl:hidden",
					currentPath === "/bridge" && "flex-col"
				)}
			>
				<FormSwap
					setVol={setVol}
					setHistoricalPrices={setHistoricalPrices}
					token0={token0}
					token1={token1}
					setToken0={setToken0}
					setToken1={setToken1}
					token0InputAmount={token0InputAmount}
					setToken0InputAmount={setToken0InputAmount}
					token1OutputAmount={token1OutputAmount}
					setToken1OutputAmount={setToken1OutputAmount}
					token1OutputDisplayAmount={token1OutputDisplayAmount}
					setToken1OutputDisplayAmount={setToken1OutputDisplayAmount}
					handleChangeToken={handleChangeToken}
					setIsModalChartOpen={setIsModalChartOpen}
				/>
				{/* {currentPath === "/exchange/swap" && ( */}
				<div className="hidden h-[514px] w-[722px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={token0}
						token1={token1}
						vol={isNaN(vol) ? "0" : vol}
						dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={handleChangeToken}
					/>
				</div>
				{/* )} */}
			</div>
			<div
				className={twMerge(
					"hidden w-full flex-row justify-center items-center gap-6 xl:flex-row xl:flex xl:max-h-[514px]"
					// currentPath !== "/bridge" && "xl:max-h-[514px]"
				)}
			>
				{/* TODO uncomment */}
				{/* <div className="hidden h-[514px] flex-1 flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={token0}
						token1={token1}
						vol={isNaN(vol) ? "0" : vol}
						dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={handleChangeToken}
					/>
				</div> */}

				<FormSwap
					setVol={setVol}
					setHistoricalPrices={setHistoricalPrices}
					token0={token0}
					token1={token1}
					setToken0={setToken0}
					setToken1={setToken1}
					token0InputAmount={token0InputAmount}
					setToken0InputAmount={setToken0InputAmount}
					token1OutputAmount={token1OutputAmount}
					setToken1OutputAmount={setToken1OutputAmount}
					token1OutputDisplayAmount={token1OutputDisplayAmount}
					setToken1OutputDisplayAmount={setToken1OutputDisplayAmount}
					handleChangeToken={handleChangeToken}
					setIsModalChartOpen={setIsModalChartOpen}
				/>
			</div>
			{/* Table */}
			{/* <div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
				<div className="flex flex-col items-start gap-3 self-stretch">
					<div className="flex items-end justify-between self-stretch max-[480px]:flex-wrap">
						<span className="text-xl xl:text-2xl font-bold text-[#F1F1F1] leading-[28px]">
							Transactions
						</span>
						<div className="flex items-start rounded-lg border-[1px] border-[#2D313E] bg-[#0D0E12]">
							<div
								className={twMerge(
									"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer w-[69.58px]",
									filterTx === "All" && "bg-[#2D313E]"
								)}
								onClick={() => setFilterTx("All")}
							>
								<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
									All
								</span>
							</div>
							<div
								className={twMerge(
									"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
									filterTx === "Wallet" && "bg-[#2D313E]"
								)}
								onClick={() => setFilterTx("Wallet")}
							>
								<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
									Wallet tx
								</span>
							</div>
						</div>
					</div>
					<Divider />
					<div className="hidden w-full md:flex">
						<TransactionDesktop
							loading={loading}
							currentPage={currentPage}
							pageSize={pageSize}
							rowsData={rowsData}
							filterTx={filterTx}
							address={address}
							walletData={walletData}
							filterTypeTx={filterTypeTx}
							setFilterTypeTx={setFilterTypeTx}
						/>
					</div>
					<div className="flex flex-col items-start gap-3 self-stretch md:hidden">
						{filterTx === "All" && (
							<>
								{loading ? (
									<div className="flex flex-col gap-2 w-full">
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
									</div>
								) : rowsData.length > 0 ? (
									currentPage === 1 ? (
										rowsData
											.slice(0, currentPage * pageSize)
											.map((item, idx) => <Transaction key={idx} item={item} />)
									) : (
										rowsData
											.slice(
												(currentPage - 1) * pageSize,
												currentPage * pageSize
											)
											.map((item, idx) => <Transaction key={idx} item={item} />)
									)
								) : (
									<div className="w-full flex items-center justify-center text-base text-[#c6c6c6] font-normal">
										No Liquidity Transaction!
									</div>
								)}
							</>
						)}
						{filterTx === "Wallet" && (
							<>
								{loading ? (
									<div className="flex flex-col gap-2 w-full">
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
									</div>
								) : walletData.length > 0 ? (
									currentPage === 1 ? (
										walletData
											.slice(0, currentPage * pageSize)
											.map((item, idx) => {
												return <Transaction key={idx} item={item} />;
											})
									) : (
										walletData
											.slice(
												(currentPage - 1) * pageSize,
												currentPage * pageSize
											)
											.map((item, idx) => {
												return <Transaction key={idx} item={item} />;
											})
									)
								) : (
									<div className="w-full flex items-center justify-center text-base text-[#c6c6c6] font-normal">
										No Liquidity Transaction!
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<div className="flex w-full items-center justify-center">
					{filterTx === "All" && totalItems > 0 && (
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={totalItems}
							onChange={handleChange}
						/>
					)}
					{filterTx === "Wallet" && walletData.length > 0 && (
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={walletData.length}
							onChange={handleChange}
						/>
					)}
				</div>
			</div>
			{isShowBridgeModal && (
				<DetailBridgeModal
					isShowing={isShowBridgeModal}
					hide={setIsShowBridgeModal}
				/>
			)} */}
			{/* {isModalChartOpen && (
				<ChartModal
					isShowing={isModalChartOpen}
					hide={() => setIsModalChartOpen(false)}
					token0={token0}
					token1={token1}
					vol={isNaN(vol) ? "0" : vol}
					dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
					handleChangeToken={handleChangeToken}
				/>
			)} */}
		</div>
	);
};

export default function WrapSwapPage() {
	// const { isConnected: isConnectedEvm } = useActiveWeb3React();

	// return isConnectedEvm ? <SwapPageEVM /> : <AddLiquidityPage />;

	return <AddLiquidityPage />;
}
