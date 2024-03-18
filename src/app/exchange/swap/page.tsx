"use client";

// @ts-nocheck
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { ChartDesktop } from "@/app/exchange/add-liquidity/components/Chart";
import { Transaction } from "@/app/exchange/add-liquidity/components/Transaction";
import { TransactionDesktop } from "@/app/exchange/add-liquidity/components/TransactionDesktop";
import { Pagination, Skeleton } from "antd";
import icons from "../assets/icons";
import { Divider } from "../components/Divider";
// import { SwapPageEVM } from "../evm/pages/swap/SwapPageEVM.jsx";
// import { BigNumber as BigNumberEthers } from "ethers";
import useCurrentAccount from "../hooks/useCurrentAccount";
// import { useActiveWeb3React } from "../evm/hooks/useActiveWeb3React.js";
import { twMerge } from "tailwind-merge";
import { useLocationPath } from "../hooks/useLocationPath.js";
import SwapForm from "./components/SwapForm";
import { APP_CHAIN_ID, TOKEN_LIST, WETH } from "@/app/configs/networks";
import { Transactions } from "../components/Transactions";
import { Field } from "../configs/networks";
import { useExchangeStore } from "../store";

const SwapPage = () => {
	// Token Picker
	const tokens = useExchangeStore((s) => s.tokens);

	const { account, address, status } = useCurrentAccount();
	const [vol, setVol] = useState(0);
	const [historicalPrices, setHistoricalPrices] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [filterTx, setFilterTx] = useState("All");
	const [filterTypeTx, setFilterTypeTx] = useState("All");

	// Token Picker
	// const [token0, setToken0] = useState(mockDataTokenTest[1]);
	// const [token1, setToken1] = useState(mockDataTokenTest[2]);

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

	return (
		<div
			className={twMerge(
				"flex w-full flex-col gap-6 text-white mb-[80px] max-[480px]:items-center md:items-center",
				currentPath === "/bridge" && "lg:pt-[222px]"
			)}
		>
			<div
				className={twMerge(
					"flex flex-row justify-center items-center gap-6 xl:max-h-[514px] xl:flex-col xl:hidden",
					currentPath === "/bridge" && "flex-col"
				)}
			>
				<SwapForm />
				{/* {currentPath === "/exchange/swap" && ( */}
				<div className="hidden h-[514px] w-[722px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={tokens[Field.INPUT]}
						token1={tokens[Field.OUTPUT]}
						// token1={token1}
						// vol={isNaN(vol) ? "0" : vol}
						// dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={() => true}
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
				<div className="hidden h-[514px] flex-1 flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={tokens[Field.INPUT]}
						token1={tokens[Field.OUTPUT]}
						// vol={isNaN(vol) ? "0" : vol}
						// dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={() => true}
					/>
				</div>
				<SwapForm />
			</div>
			{/* Transactions table */}
			<Transactions
				token0={tokens[Field.INPUT]}
				token1={tokens[Field.OUTPUT]}
			/>
			{/* {isShowBridgeModal && (
				<DetailBridgeModal
					isShowing={isShowBridgeModal}
					hide={setIsShowBridgeModal}
				/>
			)} */}
			{/* {isModalChartOpen && (
				<ChartModal
					isShowing={isModalChartOpen}
					hide={() => setIsModalChartOpen(false)}
					token0={WETH[APP_CHAIN_ID]}
					token1={WETH[APP_CHAIN_ID]}
					token1={"B"}
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

	// return isConnectedEvm ? <SwapPageEVM /> : <SwapPage />;

	return <SwapPage />;
}
